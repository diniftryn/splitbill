import { View, FlatList, Pressable, Text } from "react-native";
// import { expenses } from "@/constants/Data";
import ExpensesListItem from "@/src/components/ExpensesListItem";
import { Link, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Expenses({ name, expenses, path }: { name: string; expenses: Expense[]; path: string }) {
  return (
    <View className="bg-purple-300 min-h-full">
      <Stack.Screen
        options={{
          headerTitle: name as string,
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#EDF76A"
          }
        }}
      />

      {expenses.length == 0 ? (
        <View className="min-h-full flex justify-center">
          <Text className="text-center text-base">No expenses added yet.</Text>
        </View>
      ) : (
        <FlatList data={expenses} keyExtractor={(item, index) => item.description + index} renderItem={({ item }) => <ExpensesListItem expense={item} path={path} />} onEndReachedThreshold={1} contentInsetAdjustmentBehavior="automatic" />
      )}

      <Link href="/add-expense/" asChild>
        <Pressable className="border border-black rounded-full bg-[#EDF76A] absolute bottom-[2px] p-2 right-[41vw] z-50">
          <Ionicons name="add" size={35} color="black" />
        </Pressable>
      </Link>
      <View className="border border-black rounded-full bg-black absolute bottom-[0px] p-2 right-[40vw] z-40">
        <Ionicons name="add" size={35} color="black" />
      </View>
    </View>
  );
}
