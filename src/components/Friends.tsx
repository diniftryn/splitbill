import { View, FlatList, Pressable, Alert, Text } from "react-native";
// import { friends } from "@/constants/Data";
import FriendsListItem from "@/src/components/FriendsListItem";
import { Link, Stack } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Friends({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<{ name: string }[]>([]);

  useEffect(() => {
    if (session) getFriends();
  }, [session]);

  async function getFriends() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase.from("users").select().eq("id", session?.user.id).single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFriends(data.friends);
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
          headerTitle: "friends",
          headerTintColor: "black",
          headerStyle: {
            backgroundColor: "#EDF76A"
          },
          // headerSearchBarOptions: {}
          headerRight: () => (
            <Link href="/add-friends" asChild>
              <Pressable>
                <AntDesign name="adduser" size={24} color="black" />
              </Pressable>
            </Link>
          )
        }}
      />
      {/* <Text>{JSON.stringify(friends.length)}</Text> */}
      {friends.length == 0 ? (
        <View className="min-h-full flex justify-center">
          <Text className="text-center text-base">No friends added yet.</Text>
        </View>
      ) : (
        <FlatList data={friends} keyExtractor={(item, index) => item.name + index} renderItem={({ item }) => <FriendsListItem item={item} />} onEndReachedThreshold={1} contentInsetAdjustmentBehavior="automatic" />
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
