"use client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export function useSession() {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;
		(async () => {
			const { data } = await supabase.auth.getSession();
			if (!isMounted) return;
			setSession(data.session);
			setLoading(false);
		})();
		const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
			setSession(newSession);
		});
		return () => {
			isMounted = false;
			listener.subscription.unsubscribe();
		};
	}, []);

	return { session, loading };
}
