import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function FriendsLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
