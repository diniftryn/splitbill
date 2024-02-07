import { ImageBackground, View, StyleSheet } from "react-native";
import React from "react";
import ExpensesListItemDetails from "../../../components/ExpensesListItemDetails";

export default function ExpenseDetails() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/images/3.png")}
        // source={require("../../../../assets/images/clouds-splash.jpeg")}
        style={styles.backgroundImage}
      >
        <ExpensesListItemDetails />
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
    resizeMode: "cover", // or 'contain' for different scaling options
    justifyContent: "center" // Adjust as needed
  }
});
