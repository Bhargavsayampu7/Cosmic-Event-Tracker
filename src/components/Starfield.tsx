"use client";
import { useEffect, useRef } from "react";

export function Starfield() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let raf = 0;
		const DPR = Math.min(window.devicePixelRatio || 1, 2);
		const stars = Array.from({ length: 250 }, () => ({
			x: Math.random(),
			y: Math.random(),
			s: Math.random() * 1.2 + 0.2,
			v: Math.random() * 0.0005 + 0.00015,
		}));

		function resize() {
			if (!canvas) return;
			const { innerWidth, innerHeight } = window;
			canvas.width = innerWidth * DPR;
			canvas.height = innerHeight * DPR;
			canvas.style.width = `${innerWidth}px`;
			canvas.style.height = `${innerHeight}px`;
			ctx.scale(DPR, DPR);
		}
		resize();
		window.addEventListener("resize", resize);

		function tick() {
			if (!canvas) return;
			const { innerWidth: w, innerHeight: h } = window;
			ctx.clearRect(0, 0, w, h);
			for (const star of stars) {
				star.y += star.v;
				if (star.y > 1) star.y = 0;
				ctx.globalAlpha = 0.6 + Math.sin((star.y + star.x) * 50) * 0.4;
				ctx.fillStyle = "white";
				ctx.beginPath();
				ctx.arc(star.x * w, star.y * h, star.s, 0, Math.PI * 2);
				ctx.fill();
			}
			raf = requestAnimationFrame(tick);
		}
		tick();
		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<div className="pointer-events-none fixed inset-0 -z-10">
			<div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#0b1025] to-black" />
			<canvas ref={canvasRef} className="absolute inset-0" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0)_60%)]" />
			<div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.75)]" />
		</div>
	);
}
