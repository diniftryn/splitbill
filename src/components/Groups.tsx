import { View, FlatList, Pressable, Alert, Text } from "react-native";
// import { groups } from "@/constants/Data";
import FriendsListItem from "@/src/components/FriendsListItem";
import { Link, Stack } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Groups({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<{ name: string }[]>([]);

  useEffect(() => {
    if (session) getGroups();
  }, [session]);

  async function getGroups() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase.from("users").select().eq("authId", session?.user.id).single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        const { data: groups, error } = await supabase.from("groups").select().in("id", data.groupIds);

        if (error) throw error;
        if (groups.length > 0) setGroups(groups);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

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
        <FlatList data={groups} keyExtractor={(item, index) => item.name + index} renderItem={({ item }) => <FriendsListItem item={item} />} onEndReachedThreshold={1} contentInsetAdjustmentBehavior="automatic" />
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
