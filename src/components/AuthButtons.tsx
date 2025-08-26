"use client";
import { supabase, hasSupabaseEnv } from "@/lib/supabase";
import { useSession } from "@/lib/auth";

export function AuthButtons() {
	const { session } = useSession();
	if (!hasSupabaseEnv() || !supabase) return null;
	return (
		<div className="text-sm">
			{session ? (
				<button
					onClick={async () => {
						if (supabase) {
							await supabase.auth.signOut();
						}
					}}
					className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-white backdrop-blur transition"
				>
					Logout
				</button>
			) : (
				<button
					onClick={async () => {
						if (supabase) {
							await supabase.auth.signInWithOAuth({ provider: "github" });
						}
					}}
					className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 hover:bg-white/15 text-white backdrop-blur transition"
				>
					Login
				</button>
			)}
		</div>
	);
}
