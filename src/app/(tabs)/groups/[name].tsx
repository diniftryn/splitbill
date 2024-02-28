import { useLocalSearchParams } from "expo-router";
import Expenses from "@/src/components/Expenses";
import { supabase } from "@/src/lib/supabase";
import { useEffect, useState } from "react";

export default function GroupsExpensesScreen() {
  const { name, groupId } = useLocalSearchParams();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  async function getExpenses() {
    const { data, error } = await supabase.from("expenses").select().eq("groupId", groupId);
    if (!error) {
      setExpenses(data);
    }
  }

  useEffect(() => {
    getExpenses();
  }, [expenses]);

  return <Expenses expenses={expenses} name={name as string} path="groups" />;
}
