import { View, Text } from "react-native";
import React from "react";
import ExpensesListItemDetails from "../../../components/ExpensesListItemDetails";
import { useLocalSearchParams } from "expo-router";

export default function ExpenseDetails() {
  return (
    <View>
      <ExpensesListItemDetails />
    </View>
  );
}
