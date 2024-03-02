import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Expenses from "@/src/components/Expenses";
import { useExpensesList } from "@/src/api/expenses";
import { ActivityIndicator } from "react-native";

export default function GroupsExpensesScreen() {
  const { name, groupId } = useLocalSearchParams();

  const { data: expenses, error, isLoading } = useExpensesList(groupId as string);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch groups</Text>;
  }

  return <Expenses expenses={expenses as Expense[]} name={name as string} path="groups" />;
}
