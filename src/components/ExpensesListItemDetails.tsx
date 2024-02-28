import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
// import { expenses } from "../../constants/Data";
import { supabase } from "../lib/supabase";
import RemoteImage from "./RemoteImage";
import { Foundation } from "@expo/vector-icons";

export default function ExpensesListItemDetails() {
  const { expenseId } = useLocalSearchParams();
  const [expense, setExpense] = useState<Expense>();

  async function getExpense() {
    const { data: expense, error } = await supabase.from("expenses").select().eq("id", expenseId);
    if (error) return <Text>Unable to fetch expense details.</Text>;
    if (expense) setExpense(expense[0]);
  }

  useEffect(() => {
    getExpense();
  }, [expense]);

  return (
    <View className="gap-y-5">
      <View className="bg-white w-[70vw] px-6 py-5 rounded-xl border">
        <View className="mb-5 w-full border-b-[1px] pb-2">
          <Text className="text-xl font-semibold">{expense?.description}</Text>
          <Text className="text-lg">07 February 2024</Text>
        </View>

        <View className="gap-y-1">
          <Text className="text-base">Paid by: {expense?.payerId}</Text>
          <Text className="text-base">Amount: ${expense?.amount}</Text>
        </View>
      </View>

      <TouchableOpacity className="px-2 pt-2 border border-dashed border-black bg-[#FDF3FD]">
        {expense?.image ? (
          <View className="items-center p-2">
            <RemoteImage fallback="/images/clouds1.jpeg" path={expense?.image} className="h-20 w-20" />
            <Text className="text-base">view receipt</Text>
          </View>
        ) : (
          <View className="items-center p-2">
            <Foundation name="camera" size={40} color="black" />
            <Text className="text-base">add receipt</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
