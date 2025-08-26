"use client";
import { useState } from "react";
import { format } from "date-fns";
import { addDays, formatYmd, fetchNeoFeed, groupNeosByDate } from "@/lib/nasa";
import { useNeoStore } from "@/store/neoStore";

export function FilterBar() {
	const { setLoading, setError, mergeFeed, setRange, filters, setFilters } = useNeoStore();
	const [start, setStart] = useState<string>(formatYmd(new Date()));
	const [end, setEnd] = useState<string>(formatYmd(addDays(new Date(), 3)));

	async function applyRange() {
		const startDate = new Date(start);
		const endDate = new Date(end);
		const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
		if (diffDays > 3) {
			setError("A maximum of 3 days can be requested. Please refresh and choose a shorter range.");
			return;
		}
		try {
			setLoading(true);
			setError(null);
			const data = await fetchNeoFeed({ start_date: start, end_date: end });
			mergeFeed(groupNeosByDate(data));
			setRange({ startYmd: start, endYmd: end });
		} catch (e: any) {
			setError("Unable to load that range. A maximum of 3 days is supported. Please refresh and try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="border border-white/10 rounded-xl p-3 sm:p-4 bg-white/5 backdrop-blur">
			<div className="flex flex-col lg:flex-row gap-3 lg:items-end">
				<div className="flex flex-col sm:flex-row items-start sm:items-end gap-2 sm:gap-3">
					<label className="text-xs opacity-80 w-full sm:w-auto">
						Start
						<input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="date-input block mt-1 bg-black/20 border border-white/20 rounded px-2 py-1 w-full sm:w-auto" />
					</label>
					<label className="text-xs opacity-80 w-full sm:w-auto">
						End
						<input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="date-input block mt-1 bg-black/20 border border-white/20 rounded px-2 py-1 w-full sm:w-auto" />
					</label>
					<button onClick={applyRange} className="px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-sm w-full sm:w-auto">Apply</button>
				</div>
				<div className="flex items-center gap-2 lg:ml-auto">
					<label className="text-sm">Sort:
						<select value={filters.sortBy} onChange={(e) => setFilters({ sortBy: e.target.value as any })} className="ml-2 bg-black/20 border border-white/20 rounded px-2 py-1 text-sm">
							<option value="date_asc">Ascending</option>
							<option value="date_desc">Descending</option>
						</select>
					</label>
				</div>
			</div>
		</div>
	);
}
