import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
	if (!supabaseUrl || !supabaseKey) {
		return null;
	}

	if (!supabaseClient) {
		supabaseClient = createClient(supabaseUrl, supabaseKey);
	}

	return supabaseClient;
}
