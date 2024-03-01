import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFriendList = () => {
  const { user } = useAuth();

  if (!user) throw new Error("No user data.");

  return useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .in("email", user.friendsEmail as string[]);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};
