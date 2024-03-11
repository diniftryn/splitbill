import { supabase } from "@/src/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserBalances = (groupId: string) => {
  let owedAmounts: any = {};

  return useQuery({
    queryKey: ["userBalances"],
    queryFn: async () => {
      const { data: group, error: errorGroup } = await supabase.from("groups").select().eq("id", groupId);
      const { data: expenses, error: errorExpenses } = await supabase.from("expenses").select().eq("groupId", groupId);
      console.log("expenses: " + JSON.stringify(expenses));

      if (errorGroup || errorExpenses) throw new Error(errorGroup?.message || errorExpenses?.message);
      const { data: participants, error: errorParticipants } = await supabase.from("participants").select().in("expenseId", group[0].expenseIds);
      const { data: payments, error: errorPayments } = await supabase.from("payments").select();

      if (errorParticipants || errorPayments) throw new Error(errorParticipants?.message || errorPayments?.message);
      if (!errorExpenses && !errorParticipants && !errorPayments) {
        owedAmounts = calculateOwedAmounts(expenses, participants, payments, group);
      }

      const { data: users, error: errorUsers } = await supabase.from("users").select().in("id", group[0].userIds);
      if (errorUsers) throw new Error(errorUsers.message);
      console.log(JSON.stringify("users: " + JSON.stringify(users)));

      return { group, users, owedAmounts };
    }
  });
};

function calculateOwedAmounts(expenses: any, participants: any, payments: any, group: any) {
  const userBalances: any = {};

  group &&
    group[0].userIds.forEach((user: any) => {
      userBalances[user] = 0;
      console.log("step 1 group members initialize userBalance: " + JSON.stringify(userBalances));
    });

  participants.forEach((participant: { userId: string | number; shareAmount: number }) => {
    userBalances[participant.userId] += participant.shareAmount;
    console.log("step 2 participants: " + JSON.stringify(userBalances));
  });

  expenses.forEach((expense: { payerId: any; amount: number }) => {
    userBalances[expense.payerId] -= expense.amount;
    console.log("step 3 expenses: " + JSON.stringify(userBalances));
  });

  payments.forEach((payment: { payerId: string | number; amount: number; payeeId: string | number }) => {
    userBalances[payment.payerId] -= payment.amount;
    userBalances[payment.payeeId] += payment.amount;
    console.log("step 4 payments: " + JSON.stringify(userBalances));
  });

  return userBalances;
}
