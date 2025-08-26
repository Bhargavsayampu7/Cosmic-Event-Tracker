"use client";
import { useMemo } from "react";
import { useNeoStore } from "@/store/neoStore";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Link from "next/link";
import { hasSupabaseEnv } from "@/lib/supabase";
import { useSession } from "@/lib/auth";

export default function ComparePage() {
	const cache = useNeoStore((s) => s.cacheByDate);
	const selected = useNeoStore((s) => s.selectedIds);
	const { session, loading } = useSession();
	const requireAuth = hasSupabaseEnv();

	const data = useMemo(() => {
		const rows: Array<{ id: string; name: string; missKm: number; velocityKps: number; diameterKm: number; hazardous: boolean }>
			= [];
		for (const date of Object.keys(cache)) {
			for (const neo of cache[date] || []) {
				if (!selected.has(neo.id)) continue;
				rows.push({
					id: neo.id,
					name: neo.name,
					missKm: neo.closestMissDistanceKm || 0,
					velocityKps: neo.closestApproachVelocityKps || 0,
					diameterKm: neo.avgDiameterKm,
					hazardous: neo.isHazardous,
				});
			}
		}
		return rows;
	}, [cache, selected]);

	if (requireAuth && !loading && !session) {
		return <p className="text-sm">Please login to access compare.</p>;
	}

	if (data.length === 0) {
		return (
			<div className="space-y-2">
				<p className="text-sm">No selected NEOs. Go back and choose some.</p>
				<Link className="underline" href="/">Back to list</Link>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<h1 className="text-xl sm:text-2xl font-semibold">Compare Selected NEOs</h1>
			<div className="w-full h-[300px] sm:h-[420px]">
				<ResponsiveContainer width="100%" height="100%">
					<ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
						<CartesianGrid />
						<XAxis type="number" dataKey="missKm" name="Miss Distance" unit=" km" tickFormatter={(v) => v.toLocaleString()} />
						<YAxis type="number" dataKey="velocityKps" name="Velocity" unit=" km/s" tickFormatter={(v) => v.toLocaleString()} />
						<ZAxis type="number" dataKey="diameterKm" range={[60, 400]} name="Diameter" unit=" km" />
						<Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(value: any, name: any) => [value, name]} />
						<Legend />
						<Scatter name="NEOs" data={data} fill="#8884d8" />
					</ScatterChart>
				</ResponsiveContainer>
			</div>
			<ul className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
				{data.map((d) => (
					<li key={d.id} className="border rounded p-2 sm:p-3 flex items-center justify-between">
						<span className="text-xs sm:text-sm truncate flex-1">{d.name}</span>
						<span className={`text-xs px-2 py-0.5 rounded ${d.hazardous ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"} flex-shrink-0 ml-2`}>{d.diameterKm.toFixed(3)} km</span>
					</li>
				))}
			</ul>
		</div>
	);
}
