export function Footer() {
	const credit = process.env.NEXT_PUBLIC_APP_FOOTER_CREDIT || "Developed by @BhargavTeja";
	return (
		<footer className="border-t border-white/10 py-6 sm:py-8 mt-12 bg-white/5 backdrop-blur">
			<div className="max-w-5xl mx-auto px-4 text-xs sm:text-sm text-gray-300">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
					<p className="font-light text-center sm:text-left">{credit}</p>
					<div className="flex items-center gap-3 sm:gap-4">
						<a className="underline underline-offset-4 hover:text-white transition-colors" href="https://api.nasa.gov/" target="_blank" rel="noreferrer">NASA Open APIs</a>
						<a className="underline underline-offset-4 hover:text-white transition-colors" href="https://github.com/Bhargavsayampu7/Cosmic-Event-Tracker" target="_blank" rel="noreferrer">GitHub</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
