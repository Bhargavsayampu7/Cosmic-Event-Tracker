"use client";
import { NormalizedNeo } from "@/lib/nasa";
import { useNeoStore } from "@/store/neoStore";
import Link from "next/link";
import { InViewReveal } from "./anim/Reveal";

export function NEOCard({ neo }: { neo: NormalizedNeo }) {
	const toggleSelected = useNeoStore((s) => s.toggleSelected);
	const selectedIds = useNeoStore((s) => s.selectedIds);
	const selected = selectedIds.has(neo.id);

	return (
		<InViewReveal>
			<div className={`h-full min-h-[180px] sm:min-h-[200px] rounded-xl border border-white/15 bg-white/5 backdrop-blur p-3 sm:p-4 flex flex-col ${neo.isHazardous ? "ring-1 ring-red-500/30" : ""}`}>
				<div className="flex items-center justify-between mb-2 sm:mb-3">
					<label className="flex items-center gap-2 flex-1 min-w-0">
						<input type="checkbox" checked={selected} onChange={() => toggleSelected(neo.id)} />
						<span className="font-medium text-sm sm:text-base truncate">{neo.name}</span>
					</label>
					{neo.isHazardous && <span className="text-xs px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30 flex-shrink-0 ml-2">Hazardous</span>}
				</div>
				<div className="text-xs sm:text-sm grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-gray-200 flex-1">
					<p>Avg diameter: <span className="font-mono">{neo.avgDiameterKm.toFixed(3)} km</span></p>
					<p>Miss distance: <span className="font-mono">{neo.closestMissDistanceKm ? neo.closestMissDistanceKm.toLocaleString() : "-"} km</span></p>
					<p>Velocity: <span className="font-mono">{neo.closestApproachVelocityKps ? `${neo.closestApproachVelocityKps.toFixed(2)} km/s` : "-"}</span></p>
					<p>Date: <span className="font-mono">{neo.closestApproachDate || "-"}</span></p>
				</div>
				<div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm mt-2 sm:mt-3">
					<Link className="underline underline-offset-4" href={`/event/${neo.id}`}>Details</Link>
					<a className="underline underline-offset-4" href={neo.nasaUrl} target="_blank" rel="noreferrer">JPL</a>
				</div>
			</div>
		</InViewReveal>
	);
}
