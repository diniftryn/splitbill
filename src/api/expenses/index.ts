import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFriendGroup } from "../friends";

export const useFriendExpensesList = (userId: string, friendId: string) => {
  return useQuery({
    queryKey: ["friendExpenses"],
    queryFn: async () => {
      const { data: friendGroup, error: errorFriendGroup } = await supabase.from("groups").select("*").contains("userIds", [userId, friendId]).eq("type", "friend");
      if (errorFriendGroup) {
        throw new Error(errorFriendGroup.message);
      }
      const { data, error } = await supabase.from("expenses").select("*").eq("groupId", friendGroup[0].id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};

export const useGroupExpensesList = (groupId: string) => {
  return useQuery({
    queryKey: ["groupExpenses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("expenses").select("*").eq("groupId", groupId);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};
