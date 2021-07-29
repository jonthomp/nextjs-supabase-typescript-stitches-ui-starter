import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

import "../styles/globals.css";
import { UserContextProvider } from "../contexts/user";
import { DarkModeContextProvider } from "../contexts/darkMode";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5000,
          },
        },
      })
  );

  const initialUser = { user: pageProps?.user, session: pageProps?.session };

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <DarkModeContextProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <UserContextProvider initialValue={initialUser}>
            {getLayout(<Component {...pageProps} />, pageProps)}
          </UserContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </DarkModeContextProvider>
  );
}

export default MyApp;
