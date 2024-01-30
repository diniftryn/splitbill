import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import { expenses } from "../../constants/Data";

export default function ExpensesListItemDetails() {
  const { expense_id } = useLocalSearchParams();

  const expense = expenses.find(expense => {
    if (expense.id.toString() == expense_id) return expense;
  });

  return (
    <View style={{ gap: 10 }}>
      <Text style={{ color: "white" }}>{expense?.createdDate}</Text>
      <Text style={{ color: "white" }}>{expense?.description}</Text>
      <Text style={{ color: "white" }}>Paid by: {expense?.paid_by}</Text>
      <Text style={{ color: "white" }}>Amount: {expense?.amount_paid}</Text>
      <Text style={{ color: "white" }}>Owed by: {expense?.owed_by}</Text>
      <Text style={{ color: "white" }}>Amount: {expense?.amount_owed}</Text>
    </View>
  );
}
