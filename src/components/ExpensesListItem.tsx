import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function ExpensesListItem({ expense }: any) {
  return (
    <Link
      href={{
        pathname: "/friends/details",
        params: { expense_id: expense.id }
      }}
      asChild
    >
      <Pressable className="bg-white my-1 py-3 px-3 rounded-sm">
        <View>
          <Text className="text-base font-semibold mb-2">
            {expense.createdAt.slice(0, 2)} Dec | {expense.description}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-400">
            {expense.payerId} paid ${expense.amount}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
