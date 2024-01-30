import { View, Text, FlatList } from "react-native";
import React from "react";

import { expenses } from "../../constants/Data";
import ExpensesListItem from "./ExpensesListItem";

export default function ExpensesList({ friendName }: any) {
  const data = expenses.filter(expense => {
    if (expense.paid_by == friendName || expense.owed_by == friendName) return expense;
  });

  // console.log(data);
  return <FlatList data={data ? data : []} ListHeaderComponent={() => <Text>ListHeader</Text>} showsVerticalScrollIndicator={false} renderItem={({ item }) => <ExpensesListItem expense={item} />} />;
}
