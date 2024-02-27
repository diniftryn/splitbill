import "react-native-url-polyfill/auto";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import Auth from "../../../components/Auth";
import { Alert, View } from "react-native";
import { Session } from "@supabase/supabase-js";
import Friends from "@/src/components/Friends";
import { useAuth } from "@/src/providers/AuthProvider";

export default function IndexScreen() {
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    if (session) getFriends();
  }, [session]);

  async function getFriends() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase.from("users").select().eq("authId", session?.user.id).single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        const { data: friends, error } = await supabase.from("users").select().in("email", data.friendsEmail);

        if (error) throw error;
        if (friends) setFriends(friends);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return <Friends friends={friends} />;
}
