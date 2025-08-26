"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useNeoStore } from "@/store/neoStore";
import { fetchNeoById, normalizeNeo } from "@/lib/nasa";

export default function EventDetailPage() {
	const params = useParams<{ id: string }>();
	const cache = useNeoStore((s) => s.cacheByDate);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [fallback, setFallback] = useState<ReturnType<typeof normalizeNeo> | null>(null);

	const fromCache = useMemo(() => {
		const id = params?.id as string | undefined;
		if (!id) return null;
		for (const date of Object.keys(cache)) {
			const found = (cache[date] || []).find((n) => n.id === id);
			if (found) return found;
		}
		return null;
	}, [cache, params]);

	useEffect(() => {
		if (fromCache || !params?.id) return;
		let mounted = true;
		(async () => {
			try {
				setLoading(true);
				setError(null);
				const neo = await fetchNeoById(params.id);
				if (!mounted) return;
				setFallback(normalizeNeo(neo));
			} catch (e: any) {
				if (!mounted) return;
				setError(e?.message || "Failed to load NEO");
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => { mounted = false; };
	}, [fromCache, params]);

	const neo = fromCache || fallback;
	if (loading) return <p className="text-sm">Loading details...</p>;
	if (error) return <p className="text-sm text-red-400">{error}</p>;
	if (!neo) return <p className="text-sm">NEO not found.</p>;

	return (
		<div className="space-y-4">
			<h1 className="text-lg sm:text-xl font-semibold">{neo.name}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
				<div className="border rounded p-3 sm:p-4">
					<h3 className="font-medium mb-2 sm:mb-3">Quick facts</h3>
					<ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
						<li>Hazardous: {neo.isHazardous ? "Yes" : "No"}</li>
						<li>Avg diameter: {neo.avgDiameterKm.toFixed(3)} km</li>
						<li>Closest approach: {neo.closestApproachDate || "-"}</li>
						<li>Velocity: {neo.closestApproachVelocityKps ? `${neo.closestApproachVelocityKps.toFixed(2)} km/s` : "-"}</li>
						<li>Miss distance: {neo.closestMissDistanceKm ? `${neo.closestMissDistanceKm.toLocaleString()} km` : "-"}</li>
					</ul>
				</div>
				<div className="border rounded p-3 sm:p-4">
					<h3 className="font-medium mb-2 sm:mb-3">Links</h3>
					<a className="underline underline-offset-4 text-xs sm:text-sm" href={neo.nasaUrl} target="_blank" rel="noreferrer">NASA JPL reference</a>
				</div>
			</div>
			{neo.raw.orbital_data && (
				<div className="border rounded p-3 sm:p-4">
					<h3 className="font-medium mb-2 sm:mb-3">Orbital data</h3>
					<pre className="text-xs whitespace-pre-wrap overflow-x-auto">{JSON.stringify(neo.raw.orbital_data, null, 2)}</pre>
				</div>
			)}
			<div className="border rounded p-3 sm:p-4">
				<h3 className="font-medium mb-2 sm:mb-3">Raw close approach data</h3>
				<pre className="text-xs whitespace-pre-wrap overflow-x-auto">{JSON.stringify(neo.raw.close_approach_data, null, 2)}</pre>
			</div>
		</div>
	);
}
