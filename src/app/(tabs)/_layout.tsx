import { Link, Tabs } from "expo-router";
import { Pressable, View } from "react-native";
import { Text } from "tamagui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarStyle: { backgroundColor: "#F7CDE4" },
        tabBarStyle: { backgroundColor: "rgb(251 207 232)" },
        tabBarActiveTintColor: "black",
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
        name="groups"
        options={{
          headerShown: false,
          // title: "friends",
          tabBarIcon: ({ color }) => <Text style={{ color }}>groups</Text>
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          // title: "activity",
          tabBarIcon: ({ color }) => <Text style={{ color }}>activity</Text>
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          // title: "activity",
          tabBarIcon: ({ color }) => <Text style={{ color }}>settings</Text>
        }}
      />
    </Tabs>
  );
}
