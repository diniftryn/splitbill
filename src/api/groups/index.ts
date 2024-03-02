import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGroupList = () => {
  const { user } = useAuth();

  if (!user) throw new Error("No user data.");

  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .in("id", user.groupIds as string[]);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useGroupUsers = (groupUserIds: string[] | number[]) => {
  return useQuery({
    queryKey: ["groupUsers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("users").select("*").in("id", groupUserIds);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};
