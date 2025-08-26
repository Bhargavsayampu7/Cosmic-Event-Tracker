"use client";
import Link from "next/link";
import { useNeoStore } from "@/store/neoStore";
import { useMemo, useState } from "react";
import { AuthButtons } from "./AuthButtons";
import { Menu, X } from "lucide-react";

export function Header() {
	const selectedCount = useNeoStore((s) => s.selectedIds.size);
	const filters = useNeoStore((s) => s.filters);
	const setFilters = useNeoStore((s) => s.setFilters);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const compareHref = useMemo(() => {
		return selectedCount > 0 ? "/compare" : "#";
	}, [selectedCount]);

	return (
		<header className="sticky top-0 z-20 bg-transparent backdrop-blur-0 border-b border-transparent text-gray-100">
			<div className="max-w-5xl mx-auto px-4 py-3">
				{/* Desktop Header */}
				<div className="hidden sm:flex items-center justify-between">
					<Link href="/" className="font-light tracking-[-0.03em] text-xl">Cosmic Event Tracker</Link>
					<div className="flex items-center gap-3">
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={filters.showOnlyHazardous}
								onChange={(e) => setFilters({ showOnlyHazardous: e.target.checked })}
							/>
							<span>Hazardous only</span>
						</label>
						<Link
							href={compareHref}
							className={`px-3 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-sm ${selectedCount === 0 ? "opacity-50 pointer-events-none" : ""}`}
						>
							Compare ({selectedCount})
						</Link>
						<AuthButtons />
					</div>
				</div>

				{/* Mobile Header */}
				<div className="sm:hidden flex items-center justify-between">
					<Link href="/" className="font-light tracking-[-0.03em] text-lg">Cosmic Event Tracker</Link>
					<div className="flex items-center gap-2">
						<Link
							href={compareHref}
							className={`px-2 py-1 rounded-full border border-white/20 bg-white/10 text-xs ${selectedCount === 0 ? "opacity-50 pointer-events-none" : ""}`}
						>
							Compare ({selectedCount})
						</Link>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="p-1 text-white"
						>
							{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="sm:hidden mt-3 pb-3 border-t border-white/10">
						<div className="flex flex-col gap-3 pt-3">
							<label className="flex items-center gap-2 text-sm">
								<input
									type="checkbox"
									checked={filters.showOnlyHazardous}
									onChange={(e) => setFilters({ showOnlyHazardous: e.target.checked })}
								/>
								<span>Hazardous only</span>
							</label>
							<AuthButtons />
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
