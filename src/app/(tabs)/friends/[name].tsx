import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import Expenses from "@/src/components/Expenses";

export default function GroupsExpensesScreen() {
  const { user } = useAuth();
  const { name, friendId } = useLocalSearchParams();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const groupId = (user?.id as string) + "-" + friendId;

  async function getExpenses() {
    const { data, error } = await supabase.from("expenses").select().eq("groupId", groupId);
    if (!error) {
      setExpenses(data);
    }
  }

  useEffect(() => {
    getExpenses();
  }, [expenses]);

  return <Expenses expenses={expenses} name={name as string} />;
}
