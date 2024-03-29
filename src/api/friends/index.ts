import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFriendList = () => {
  const { user } = useAuth();

  if (!user?.friends_phone) return [];

  return useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .in("phone", user?.friends_phone as string[]);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useFriendGroup = (userId: string | number, friendId: string | number) => {
  const { user } = useAuth();

  if (!user) throw new Error("No user data.");

  return useQuery({
    queryKey: ["friendGroup"],
    queryFn: async () => {
      const { data, error } = await supabase.from("groups").select("*").contains("userIds", [userId, friendId]).eq("type", "friend");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};
