import { View, Text, ImageBackground, StyleSheet, FlatList, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { friends } from "@/constants/Data";
import FriendsListItem from "@/src/components/FriendsListItem";
import { Link, Stack } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function IndexScreen() {
  return (
    <View className="flex-1 bg-purple-300">
      {/* <View className="bg-[#EDF76A] p-5"></View>
        <View className="bg-[#C8AFE9] p-5"></View>
        <View className="bg-[#F7CDE4] p-5"></View>
        <View className="bg-[#FDF3FD] p-5"></View>
        <View className="bg-[#F6D238] p-5"></View>
        <Text className="gray text-gray-500 p-5"></Text> */}
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "groups",
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#EDF76A"
          },
          // headerSearchBarOptions: {}
          headerRight: () => (
            <Link href="/add-expense" asChild>
              <Pressable>
                <AntDesign name="addusergroup" size={24} color="black" />
              </Pressable>
            </Link>
          )
        }}
      />
      <FlatList data={friends} keyExtractor={(item, index) => item.name + index} renderItem={({ item }) => <FriendsListItem item={item} />} onEndReachedThreshold={1} contentInsetAdjustmentBehavior="automatic" />
      <TouchableOpacity className="border border-black rounded-full bg-[#EDF76A] absolute bottom-[2px] p-2 right-[41vw] z-50">
        <Ionicons name="add" size={35} color="black" />
      </TouchableOpacity>
      <View className="border border-black rounded-full bg-black absolute bottom-[0px] p-2 right-[40vw] z-40">
        <Ionicons name="add" size={35} color="black" />
      </View>
    </View>
  );
}
