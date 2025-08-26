"use client";
import { useEffect, useState, useCallback } from "react";
import { addDays, fetchNeoFeed, formatYmd, groupNeosByDate } from "@/lib/nasa";
import { useNeoStore } from "@/store/neoStore";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { EventList } from "@/components/EventList";
import { PageReveal, InViewReveal } from "@/components/anim/Reveal";
import Link from "next/link";
import Image from "next/image";
import { FilterBar } from "@/components/FilterBar";

export default function Home() {
  const { setLoading, setError, mergeFeed, setRange, currentRange, loading, error } = useNeoStore();
  const [daysLoaded, setDaysLoaded] = useState(3);

  const loadRange = useCallback(async (start: Date, numDays: number) => {
    try {
      setLoading(true);
      setError(null);
      const startYmd = formatYmd(start);
      const endYmd = formatYmd(addDays(start, numDays));
      const data = await fetchNeoFeed({ start_date: startYmd, end_date: endYmd });
      const groups = groupNeosByDate(data);
      mergeFeed(groups);
      setRange({ startYmd, endYmd });
    } catch (e: any) {
      setError(e?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [mergeFeed, setError, setLoading, setRange]);

  useEffect(() => {
    const today = new Date();
    loadRange(today, 3);
  }, [loadRange]);

  const onLoadMore = async () => {
    const baseStart = new Date();
    const nextDays = daysLoaded + 3;
    setDaysLoaded(nextDays);
    await loadRange(baseStart, nextDays);
  };

  return (
    <PageReveal>
      {/* Full-bleed, full-screen hero with overlaid content, shifted up by 10vh */}
      <section className="relative w-screen h-screen overflow-hidden flex items-center justify-center text-center left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -translate-y-[10vh]">
        <Image 
          src="/hero.png" 
          alt="Space horizon" 
          fill 
          priority 
          className="object-cover object-center" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80" />
        <div className="relative z-10 space-y-4 px-4 max-w-4xl mx-auto">
          <p className="text-sm/6 sm:text-base/6 text-gray-200">Explore the infinite.</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.06em] leading-tight">Cosmic Event Tracker</h1>
          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link href="#events" className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur text-white text-sm sm:text-base">See events →</Link>
          </div>
        </div>
      </section>

      <InViewReveal>
        <div id="events" className="space-y-4 scroll-mt-24">
          {loading && <LoadingSpinner />}
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-light tracking-[-0.04em]">Upcoming Near-Earth Objects</h2>
              {currentRange && (
                <p className="text-sm text-gray-300">Range: {currentRange.startYmd} → {currentRange.endYmd}</p>
              )}
            </div>
            <button onClick={onLoadMore} className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-sm w-full sm:w-auto">Load more</button>
          </div>

          <FilterBar />
          <EventList />
        </div>
      </InViewReveal>
    </PageReveal>
  );
}
