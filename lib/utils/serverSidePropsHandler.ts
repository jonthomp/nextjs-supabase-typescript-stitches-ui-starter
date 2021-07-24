import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { supabasePublic } from "../supabase/supabasePublic";

export const serverSidePropsHandler = async ({
  ctx,
  redirect = "not-authenticated",
  redirectDestination = redirect === "authenticated" ? "/home" : "/login",
  prefetchQueries = ({ ctx, queryClient, user, session }) => [],
  props = {},
}: {
  ctx: any;
  redirect?: "none" | "authenticated" | "not-authenticated";
  redirectDestination?: string;
  prefetchQueries?: ({ ctx, queryClient, user, session }) => any[];
  props?: any;
}) => {
  const { user } = await supabasePublic.auth.api.getUserByCookie(ctx.req);
  const session = user
    ? supabasePublic.auth.setAuth(ctx.req.cookies["sb:token"])
    : null;

  if (
    (user && redirect === "authenticated") ||
    (!user && redirect === "not-authenticated")
  ) {
    return {
      props: {},
      redirect: { destination: redirectDestination, permanent: false },
    };
  }

  const queryClient = new QueryClient();

  await Promise.all(prefetchQueries({ ctx, queryClient, user, session }));

  return {
    props: { user, session, dehydratedState: dehydrate(queryClient), ...props },
  };
};
