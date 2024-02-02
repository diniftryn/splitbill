import { StyleSheet, View, Text, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Button } from "tamagui";

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
        <Text style={styles.text}>description</Text>
        <TextInput value={form.description} onChangeText={text => setForm({ ...form, description: text })} placeholder="enter a description" style={styles.input} keyboardType="default" />
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>amount</Text>
        <TextInput value={form.amount_paid} onChangeText={text => setForm({ ...form, amount_paid: text })} placeholder="0.00" style={styles.input} keyboardType="numeric" />
      </View>

      <Button
        style={{ marginTop: 20 }}
        onPress={() => {
          Alert.alert("expense added successfully");
        }}
      >
        + add
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 5,
    margin: 20
  },
  row: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: 5
  },
  text: {
    fontSize: 16,
    fontWeight: "500"
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
