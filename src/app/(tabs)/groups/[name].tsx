import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import ExpensesList from "../../../components/ExpensesList";

export default function FriendsExpensesScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/images/2.png")}
        // source={require("../../../../assets/images/clouds-splash.jpeg")}
        style={styles.backgroundImage}
      >
        <Stack.Screen options={{ title: name as string }} />

        <View style={{ padding: 10 }}>
          <ExpensesList friendName={name} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover" // or 'contain' for different scaling options
    // justifyContent: "center" // Adjust as needed
  }
});
