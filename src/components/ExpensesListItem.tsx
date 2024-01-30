import { View, Text, Pressable } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

export default function ExpensesListItem({ expense }: any) {
  return (
    // <Link href="/friends/details" asChild>
    <Link
      href={{
        pathname: "/friends/details",
        params: { expense_id: expense.id }
      }}
      asChild
    >
      <Pressable
        style={{
          backgroundColor: "white",
          marginVertical: 5,
          padding: 10,
          borderRadius: 5,
          gap: 5
        }}
        // onPress={() => router.push({ pathname: "/friends/details", params: expense })}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>
            {expense.createdDate.slice(0, 2)} Dec | {expense.description}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ color: "gray" }}>
            {expense.paid_by} paid ${expense.amount_paid}
          </Text>
          <Text style={{ color: "gray" }}>
            {expense.owed_by} owes ${expense.amount_owed}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
