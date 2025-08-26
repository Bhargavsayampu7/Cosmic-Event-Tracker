"use client";
import { useMemo } from "react";
import { useNeoStore } from "@/store/neoStore";
import { NEOCard } from "./NEOCard";

export function EventList() {
	const cache = useNeoStore((s) => s.cacheByDate);
	const filters = useNeoStore((s) => s.filters);

	const items = useMemo(() => {
		let dates = Object.keys(cache);
		dates.sort();
		if (filters.sortBy === "date_desc") dates = dates.reverse();
		return dates.map((date) => {
			let neos = cache[date] || [];
			if (filters.showOnlyHazardous) neos = neos.filter((n) => n.isHazardous);
			return { date, neos };
		});
	}, [cache, filters]);

	if (items.length === 0) return <p className="text-sm text-gray-500 p-4">No data. Try changing dates.</p>;

	return (
		<div className="space-y-6">
			{items.map((g) => (
				<section key={g.date}>
					<h3 className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">{g.date}</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
						{g.neos.map((neo) => (
							<NEOCard key={neo.id} neo={neo} />
						))}
					</div>
				</section>
			))}
		</div>
	);
}
