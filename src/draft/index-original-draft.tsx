import { Link, Stack } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Text, View } from "tamagui";
import FriendsListItem from "../components/FriendsListItem";
import { friends } from "../../constants/Data";

export default function FriendsScreen() {
  return (
    <View flex={1}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "friends",
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
    </View>
  );
}
