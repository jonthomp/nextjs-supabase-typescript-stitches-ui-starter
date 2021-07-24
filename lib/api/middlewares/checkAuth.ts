import { supabasePublic } from "../../supabase/supabasePublic";
import { HTTPError } from "../HTTPError";

export async function checkAuth(req, res, next) {
  const { user, error } = await supabasePublic.auth.api.getUserByCookie(req);

  if (error || !user) {
    throw new HTTPError(403);
  }

  next();
}
