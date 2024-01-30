import { View, Text, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import ExpensesList from "../../../components/ExpensesList";

export default function FriendsExpensesScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: name as string }} />

      <ExpensesList friendName={name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
