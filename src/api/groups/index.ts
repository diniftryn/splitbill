import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery, useMutation, useQueryClient, InvalidateQueryFilters } from "@tanstack/react-query";

export const useGroupList = () => {
  const { user } = useAuth();

  if (!user) throw new Error("No user data.");
  if (!user.groupIds) return [];

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

export const useDeleteGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(group: Group) {
      const { error: errorGroup } = await supabase.from("groups").delete().eq("id", group.id);
      const { error: errorExpenses } = await supabase.from("expenses").delete().in("id", group.expenseIds);

      group.userIds.map(async userId => {
        const { data: user, error: errorUser } = await supabase.from("users").select().eq("id", userId).single();
        const groupIdsToUpdate = user.groupIds.filter((id: string) => {
          return id !== group.id;
        });

        const { error: errorUpdateGroup } = await supabase.from("users").update({ groupIds: groupIdsToUpdate }).eq("id", userId).select();
        console.log("userId: " + userId + " groupIdsToUpdate: " + groupIdsToUpdate);

        if (errorUser || errorUpdateGroup) {
          throw new Error(errorUser?.message || errorUpdateGroup?.message);
        }
      });
      if (errorGroup || errorExpenses) {
        throw new Error(errorGroup?.message || errorExpenses?.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["groups"] as InvalidateQueryFilters);
    }
  });
};
