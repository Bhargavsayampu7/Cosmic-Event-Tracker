"use client";
import { useEffect } from "react";

export function ScrollReset() {
	useEffect(() => {
		if ("scrollRestoration" in window.history) {
			window.history.scrollRestoration = "manual";
		}
		if (!window.location.hash) {
			window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
		}
	}, []);
	return null;
}
