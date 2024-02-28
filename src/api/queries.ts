import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

const { user } = useAuth();

export async function getFriends() {
  try {
    if (!user) throw new Error("No user on the session!");

    const { data, error, status } = await supabase.from("users").select().eq("authId", user.id).single();
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      const { data: friends, error } = await supabase.from("users").select().in("email", data.friendsEmail);

      if (error) throw error;
      if (friends) return { data: friends, error: null };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
  }
}

export async function getGroups() {
  try {
    if (!user) throw new Error("No user on the session!");

    const { data, error, status } = await supabase.from("users").select().eq("authId", user.id).single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      const { data: groups, error } = await supabase.from("groups").select().in("id", data.groupIds);

      if (error) throw error;
      if (groups) return { data: groups };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
  }
}
