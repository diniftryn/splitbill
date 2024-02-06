import { View, Text, ImageBackground, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { friends } from "../../../../constants/Data";
import FriendsListItem from "../../../components/FriendsListItem";
import { Link, Stack } from "expo-router";
// import { GlassView, GlassButton } from "@metafic-co/react-native-glassmorphism";

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        // source={require("../../../../assets/images/1.png")}
        source={require("../../../../assets/images/clouds-splash.jpeg")}
        style={styles.backgroundImage}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: "friends",
            headerTransparent: true,
            headerTintColor: "rgb(0, 122, 255)", // Change header text color
            headerStyle: {
              backgroundColor: "rgba(255, 255, 255, 0.3)" // Use an RGBA color with alpha for translucency
            },
            // headerSearchBarOptions: {}
            headerRight: () => (
              <Link href="/add-expense" asChild>
                <Pressable>
                  <Text>Add Expense</Text>
                </Pressable>
              </Link>
            )
          }}
        />
        <FlatList data={friends} contentContainerStyle={{ gap: 5 }} style={{ padding: 10 }} keyExtractor={(item, index) => item.name + index} renderItem={({ item }) => <FriendsListItem item={item} />} onEndReachedThreshold={1} contentInsetAdjustmentBehavior="automatic" />
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
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  }
});
