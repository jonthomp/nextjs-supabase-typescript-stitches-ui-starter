import { createContext, useContext, useState, useEffect, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabasePublic } from "../lib/supabase/supabasePublic";
import { useQueryClient } from "react-query";
import { useRouter } from "next/router";

export type UserContextValue = { user: User | null; session: Session | null };
export const UserContext = createContext<UserContextValue>({
  user: null,
  session: null,
});

export type UserContextProviderProps = {
  children: React.ReactNode;
  initialValue: UserContextValue;
};

export const UserContextProvider = ({
  initialValue,
  children,
}: UserContextProviderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User | null>(() => initialValue.user);

  const [session, setSession] = useState<Session | null>(
    () => initialValue.session
  );

  useEffect(() => {
    if (initialValue.session) {
      supabasePublic.auth.setAuth(initialValue.session.access_token);
    }
    const session = supabasePublic.auth.session();
    setSession(session || initialValue.session);
    setUser(session?.user ?? initialValue.user ?? null);

    const { data: authListener } = supabasePublic.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        await fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        });

        queryClient.invalidateQueries();

        if (event === "SIGNED_OUT") {
          router.push("/");
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [queryClient, initialValue, router]);

  const value = { user, session };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const userContext = useContext(UserContext);

  return userContext;
};
