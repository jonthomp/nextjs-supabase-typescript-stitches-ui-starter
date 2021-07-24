import { withSentry } from "@sentry/nextjs";
import { supabasePublic } from "../../lib/supabase/supabasePublic";

function auth(req, res) {
  supabasePublic.auth.api.setAuthCookie(req, res);
}

export default withSentry(auth);
