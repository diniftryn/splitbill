import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../providers/AuthProvider";

export default function Index() {
  const { session, user, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return <Redirect href="/(tabs)/friends" />;
}

{
  /* <View className="bg-[#EDF76A] p-5"></View>
      <View className="bg-[#C8AFE9] p-5"></View>
      <View className="bg-[#F7CDE4] p-5"></View>
      <View className="bg-[#FDF3FD] p-5"></View>
      <View className="bg-[#F6D238] p-5"></View>
      <Text className="gray text-gray-500 p-5"></Text> */
}
