// Minimal NASA NeoWs client utilities and types

export type NeoEstimatedDiameterKm = {
	estimated_diameter_min: number;
	estimated_diameter_max: number;
};

export type NeoApproachData = {
	close_approach_date: string;
	close_approach_date_full?: string;
	epoch_date_close_approach?: number;
	relative_velocity: {
		kilometers_per_second: string;
		kilometers_per_hour: string;
		miles_per_hour: string;
	};
	miss_distance: {
		astronomical: string;
		lunar: string;
		kilometers: string;
		miles: string;
	};
	orbiting_body: string;
};

export type Neo = {
	id: string;
	neo_reference_id: string;
	name: string;
	nasa_jpl_url: string;
	absolute_magnitude_h: number;
	estimated_diameter: {
		kilometers: NeoEstimatedDiameterKm;
	};
	is_potentially_hazardous_asteroid: boolean;
	close_approach_data: NeoApproachData[];
	is_sentry_object?: boolean;
	orbital_data?: Record<string, any>;
};

export type NeoFeedResponse = {
	near_earth_objects: Record<string, Neo[]>;
	element_count: number;
	links: {
		next?: string;
		prev?: string;
		self: string;
	};
};

export type NormalizedNeo = {
	id: string;
	name: string;
	isHazardous: boolean;
	avgDiameterKm: number;
	closestApproachDate: string | null;
	closestApproachVelocityKps: number | null;
	closestMissDistanceKm: number | null;
	nasaUrl: string;
	raw: Neo;
};

const BASE_URL = "https://api.nasa.gov/neo/rest/v1";

function getApiKey(): string {
	if (typeof process !== "undefined") {
		const key = process.env.NEXT_PUBLIC_NASA_API_KEY || "DEMO_KEY";
		return key;
	}
	return "DEMO_KEY";
}

export async function fetchNeoFeed(params: {
	start_date: string; // YYYY-MM-DD
	end_date: string; // YYYY-MM-DD
}): Promise<NeoFeedResponse> {
	const apiKey = getApiKey();
	const url = new URL(BASE_URL + "/feed");
	url.searchParams.set("start_date", params.start_date);
	url.searchParams.set("end_date", params.end_date);
	url.searchParams.set("api_key", apiKey);

	const res = await fetch(url.toString(), { cache: "no-store" });
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`NASA feed error ${res.status}: ${text}`);
	}
	return (await res.json()) as NeoFeedResponse;
}

export async function fetchNeoById(id: string): Promise<Neo> {
	const apiKey = getApiKey();
	const url = `${BASE_URL}/neo/${encodeURIComponent(id)}?api_key=${apiKey}`;
	const res = await fetch(url, { cache: "no-store" });
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`NASA neo error ${res.status}: ${text}`);
	}
	return (await res.json()) as Neo;
}

export function normalizeNeo(neo: Neo): NormalizedNeo {
	const km = neo.estimated_diameter.kilometers;
	const avgDiameterKm = (km.estimated_diameter_min + km.estimated_diameter_max) / 2;
	const firstApproach = neo.close_approach_data?.[0];
	const closestApproachDate = firstApproach?.close_approach_date_full || firstApproach?.close_approach_date || null;
	const closestApproachVelocityKps = firstApproach ? Number(firstApproach.relative_velocity.kilometers_per_second) : null;
	const closestMissDistanceKm = firstApproach ? Number(firstApproach.miss_distance.kilometers) : null;

	return {
		id: neo.id,
		name: neo.name,
		isHazardous: !!neo.is_potentially_hazardous_asteroid,
		avgDiameterKm,
		closestApproachDate,
		closestApproachVelocityKps,
		closestMissDistanceKm,
		nasaUrl: neo.nasa_jpl_url,
		raw: neo,
	};
}

export function groupNeosByDate(feed: NeoFeedResponse): Array<{ date: string; neos: NormalizedNeo[] }> {
	const dates = Object.keys(feed.near_earth_objects).sort();
	return dates.map((date) => ({
		date,
		neos: (feed.near_earth_objects[date] || []).map(normalizeNeo),
	}));
}

export function addDays(date: Date, deltaDays: number): Date {
	const copy = new Date(date);
	copy.setDate(copy.getDate() + deltaDays);
	return copy;
}

export function formatYmd(d: Date): string {
	return d.toISOString().slice(0, 10);
}
