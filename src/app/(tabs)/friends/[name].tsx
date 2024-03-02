import { ActivityIndicator, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import Expenses from "@/src/components/Expenses";
import { useFriendExpensesList } from "@/src/api/expenses";

export default function GroupsExpensesScreen() {
  const { user } = useAuth();
  const { name, friendId } = useLocalSearchParams();

  const { data: friendExpenses, error, isLoading } = useFriendExpensesList(user?.id as string, friendId as string);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch friend expenses</Text>;
  }

  return (
    <View>
      <Expenses expenses={friendExpenses as Expense[]} name={name as string} path="friends" />
    </View>
  );
}
