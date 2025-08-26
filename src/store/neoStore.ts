import { create } from "zustand";
import { NormalizedNeo } from "@/lib/nasa";

export type NeoFilters = {
	showOnlyHazardous: boolean;
	sortBy: "date_asc" | "date_desc";
};

export type DateRange = {
	startYmd: string;
	endYmd: string;
};

type NeoState = {
	cacheByDate: Record<string, NormalizedNeo[]>;
	selectedIds: Set<string>;
	filters: NeoFilters;
	currentRange: DateRange | null;
	loading: boolean;
	error: string | null;

	setLoading: (v: boolean) => void;
	setError: (msg: string | null) => void;
	setRange: (range: DateRange) => void;
	mergeFeed: (groups: Array<{ date: string; neos: NormalizedNeo[] }>) => void;
	clear: () => void;
	setFilters: (f: Partial<NeoFilters>) => void;
	toggleSelected: (id: string) => void;
	clearSelection: () => void;
};

export const useNeoStore = create<NeoState>((set) => ({
	cacheByDate: {},
	selectedIds: new Set<string>(),
	filters: { showOnlyHazardous: false, sortBy: "date_asc" },
	currentRange: null,
	loading: false,
	error: null,

	setLoading: (v) => set({ loading: v }),
	setError: (msg) => set({ error: msg }),
	setRange: (range) => set({ currentRange: range }),
	mergeFeed: (groups) =>
		set((state) => {
			const next = { ...state.cacheByDate } as Record<string, NormalizedNeo[]>;
			for (const g of groups) next[g.date] = g.neos;
			return { cacheByDate: next };
		}),
	clear: () => set({ cacheByDate: {}, selectedIds: new Set<string>(), error: null }),
	setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
	toggleSelected: (id) =>
		set((s) => {
			const next = new Set(s.selectedIds);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return { selectedIds: next };
		}),
	clearSelection: () => set({ selectedIds: new Set<string>() }),
}));
