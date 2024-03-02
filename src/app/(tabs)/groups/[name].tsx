import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Expenses from "@/src/components/Expenses";
import { useGroupExpensesList } from "@/src/api/expenses";
import { ActivityIndicator } from "react-native";

export default function GroupsExpensesScreen() {
  const { name, groupId } = useLocalSearchParams();

  const { data: groupExpenses, error, isLoading } = useGroupExpensesList(groupId as string);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch group expenses</Text>;
  }

  return <Expenses expenses={groupExpenses as Expense[]} name={name as string} path="groups" />;
}
