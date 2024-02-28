import { View, StyleSheet } from "react-native";
import React from "react";
import ExpensesListItemDetails from "../../../components/ExpensesListItemDetails";
import { Stack } from "expo-router";

export default function ExpenseDetails() {
  return (
    <View className="flex-1 bg-pink-100 justify-center items-center">
      <Stack.Screen
        options={{
          headerTitle: "details",
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#EDF76A"
          }
        }}
      />
      <ExpensesListItemDetails />
    </View>
  );
}
