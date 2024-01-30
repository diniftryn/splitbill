import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { Text } from "tamagui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "yellow",
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name="friends"
        options={{
          headerShown: false,
          // title: "friends",
          tabBarIcon: ({ color }) => <Text>friends</Text>
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          // title: "activity",
          tabBarIcon: ({ color }) => <Text>activity</Text>
        }}
      />
    </Tabs>
  );
}
