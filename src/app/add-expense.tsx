import { StyleSheet, View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";

export default function AddExpenseModal() {
  const [form, setForm] = useState({
    id: -1,
    createdDate: "",
    description: "",
    paid_by: "",
    amount_paid: "",
    owed_by: "",
    amount_owed: ""
  });

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "add an expense" }} />

      <View style={styles.row}>
        <Text>Description</Text>
        <TextInput value={form.description} onChangeText={text => setForm({ ...form, description: text })} placeholder="enter a description" style={styles.input} keyboardType="default" />
      </View>

      <View style={styles.row}>
        <Text>Amount</Text>
        <TextInput value={form.amount_paid} onChangeText={text => setForm({ ...form, amount_paid: text })} placeholder="0.00" style={styles.input} keyboardType="numeric" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    gap: 5
  },
  row: {
    flexDirection: "row",
    gap: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    flex: 1,
    borderRadius: 5
    // margin: 10
  }
});
