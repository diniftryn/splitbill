import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import Auth from "../../../components/Auth";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import Groups from "@/src/components/Groups";

export default function IndexScreen() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return <View>{session && session.user ? <Groups key={session.user.id} /> : <Auth />}</View>;
}
