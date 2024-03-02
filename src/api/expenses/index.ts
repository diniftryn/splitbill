import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useExpensesList = (groupId: string) => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("expenses").select("*").eq("groupId", groupId);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
};
