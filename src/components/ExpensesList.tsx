import { FlatList, Text } from "react-native";

import { expenses } from "@/constants/Data";
import ExpensesListItem from "./ExpensesListItem";
import { supabase } from "../lib/supabase";

export default async function ExpensesList({ groupName, groupId }: { groupName: string; groupId: string }) {
  const { data, error } = await supabase.from("expenses").select().eq("id", "43");
  // const data = expenses.filter(expense => {
  //   if (expense.paid_by == friendName || expense.owed_by == friendName) return expense;
  // });
  if (error) return <Text>Unable to fetch expenses.</Text>;
  if (!data) return <Text>No expenses added</Text>;
  if (data.length > 0) return <Text>{JSON.stringify(data)}</Text>;
  <FlatList data={data ? data : []} showsVerticalScrollIndicator={false} renderItem={({ item }) => <ExpensesListItem expense={item} />} />;
}
