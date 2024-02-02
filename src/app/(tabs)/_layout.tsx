import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgb(0, 122, 255)",
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name="friends"
        options={{
          headerShown: false,
          // title: "friends",
          tabBarIcon: ({ color }) => <Text style={{ color }}>friends</Text>
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          // title: "activity",
          tabBarIcon: ({ color }) => <Text style={{ color }}>activity</Text>
        }}
      />
    </Tabs>
  );
}
