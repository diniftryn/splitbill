import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import { expenses } from "../../constants/Data";

export default function ExpensesListItemDetails() {
  const { expense_id } = useLocalSearchParams();

  const expense = expenses.find(expense => {
    if (expense.id.toString() == expense_id) return expense;
  });

  return (
    <View style={styles.detailsContainer}>
      <View style={{ gap: 5, paddingBottom: 20 }}>
        <Text style={styles.detailsHeader}>{expense?.description}</Text>
        <Text style={styles.detailsSubheader}>{expense?.createdDate}</Text>
      </View>

      <Text style={styles.detailsText}>Paid by: {expense?.paid_by}</Text>
      <Text style={styles.detailsText}>Amount: ${expense?.amount_paid}</Text>
      <Text style={styles.detailsText}>Owed by: {expense?.owed_by}</Text>
      <Text style={styles.detailsText}>Amount: ${expense?.amount_owed}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#fff",
    margin: 70,
    borderRadius: 10,
    padding: 40,
    paddingVertical: 50,
    gap: 5
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "500"
  },
  detailsSubheader: {
    fontSize: 14,
    fontWeight: "500"
  },
  detailsText: {
    fontSize: 16
  }
});
