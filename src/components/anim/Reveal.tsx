"use client";
import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

export function PageReveal({ children }: PropsWithChildren) {
	const prefersReduced = useReducedMotion();
	return (
		<motion.div
			initial={prefersReduced ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
			animate={prefersReduced ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}

export function InViewReveal({ children, delay = 0 }: PropsWithChildren<{ delay?: number }>) {
	const prefersReduced = useReducedMotion();
	return (
		<motion.div
			initial={prefersReduced ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
			whileInView={prefersReduced ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
			transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
		>
			{children}
		</motion.div>
	);
}
