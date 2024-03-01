import { View, FlatList, Pressable, Text } from "react-native";
import GroupsListItem from "./GroupsListItem";
import { Link, Stack } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function Groups({ groups }: { groups: Group[] }) {
  return (
    <View className="bg-purple-300 min-h-full">
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
            <Link href="/add-groups" asChild>
              <Pressable>
                <AntDesign name="addusergroup" size={24} color="black" />
              </Pressable>
            </Link>
          )
        }}
      />
      {groups.length == 0 ? (
        <View className="min-h-full flex justify-center">
          <Text className="text-center text-base">No groups added yet.</Text>
        </View>
      ) : (
        <FlatList data={groups} keyExtractor={(item, index) => item.name + index} renderItem={({ item }) => <GroupsListItem group={item} />} onEndReachedThreshold={1} contentInsetAdjustmentBehavior="automatic" />
      )}

      <Link href="/add-expense/" asChild>
        <Pressable className="border border-black rounded-full bg-[#EDF76A] absolute bottom-[2px] p-2 right-[41vw] z-50">
          <Ionicons name="add" size={35} color="black" />
        </Pressable>
      </Link>
      <View className="border border-black rounded-full bg-black absolute bottom-[0px] p-2 right-[40vw] z-40">
        <Ionicons name="add" size={35} color="black" />
      </View>
    </View>
  );
}
