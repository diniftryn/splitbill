import React from "react";
import { Stack } from "expo-router";

export default function FriendsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index-draft" options={{ headerShown: false }} />
    </Stack>
  );
}
