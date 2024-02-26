import { View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import ExpensesList from "@/src/components/ExpensesList";

export default function GroupsExpensesScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-purple-300">
      <Stack.Screen
        options={{
          headerTitle: name as string,
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#EDF76A"
          }
        }}
      />

      <View style={{ padding: 10 }}>
        <ExpensesList groupName={name} />
      </View>
    </View>
  );
}
