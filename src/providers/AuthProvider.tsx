import { supabase } from "@/src/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type AuthData = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,

  user: null,
  loading: true
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        const { data } = await supabase.from("users").select().eq("id", session.user.id).single();
        console.log(data);
        setUser(data);
      }

      setLoading(false);
    };

    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <AuthContext.Provider value={{ session, user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
