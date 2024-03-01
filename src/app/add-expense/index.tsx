import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import ExpenseForm from "@/src/components/ExpenseForm";
import ExpenseParticipants from "@/src/components/ExpenseParticipants";

export default function AddExpenseModal() {
  const { session, user } = useAuth();

  const [selectedFriendOrGroup, setSelectedFriendOrGroup] = useState<User | Group | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  let group: Group = { id: "", name: "", imageUrl: "", userIds: [], expenseIds: [] };
  let splitPercentage: number[] = [50, 50];
  let users: [User | null] | User[] = [user];

  const [availableFriends, setAvailableFriends] = useState<User[]>([]);
  const [availableGroups, setAvailableGroups] = useState<Group[]>([]);

  useEffect(() => {
    getFriends();
    getGroups();
  }, [availableFriends, availableGroups]);

  async function getFriends() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase.from("users").select().eq("authId", session?.user.id).single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        const { data: friends, error } = await supabase.from("users").select().in("email", data.friendsEmail);

        if (error) throw error;
        if (friends) setAvailableFriends(friends);
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }

  async function getGroups() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase.from("users").select().eq("authId", session?.user.id).single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        const { data: groups, error } = await supabase.from("groups").select().in("id", data.groupIds);

        if (error) throw error;
        if (groups) setAvailableGroups(groups);
      }
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  }

  async function getFriendGroup(groupId: string) {
    const { data, error } = await supabase.from("groups").select().eq("id", groupId).eq("type", "friend");

    if (error) console.log("Unable to fetch friend group. Error: " + error.message);
    if (data) group = data[0];
    if (!data) group = { id: groupId, name: groupId, imageUrl: "", userIds: [session?.user.id as string, selectedFriendOrGroup?.id as string], expenseIds: [] };
  }

  async function getUsers(groupUserIds: number[]) {
    const { data: groupUsers, error } = await supabase.from("users").select().in("id", groupUserIds);
    if (error) console.log("Unable to fetch group users. Error: " + error.message);
    if (groupUsers) {
      console.log("groupUsers: " + JSON.stringify(groupUsers));
      users = groupUsers as User[];
    }
  }

  if (session?.user && selectedFriendOrGroup && (selectedFriendOrGroup as User).username) {
    const groupId = session?.user.id < selectedFriendOrGroup.id ? session?.user.id + "-" + selectedFriendOrGroup?.id : selectedFriendOrGroup?.id + "-" + session?.user.id;
    getFriendGroup(groupId);
    users = [user, selectedFriendOrGroup] as User[];
  } else if (session?.user && selectedFriendOrGroup && (selectedFriendOrGroup as Group).name) {
    group = selectedFriendOrGroup as Group;
    getUsers(group.userIds as number[]);
    splitPercentage = Array(group.userIds.length).fill(100 / group.userIds.length);
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="items-center gap-y-10 flex-1 bg-pink-200">
        <Stack.Screen
          options={{
            title: "new expense",
            // headerStyle: { backgroundColor: "#EDF76A" },
            // headerStyle: {
            //   backgroundColor: "rgb(216 180 254)"
            // },
            headerLeft: () => (
              <Link href="../">
                <EvilIcons name="close" size={24} color="black" />
              </Link>
            ),
            headerRight: () => (
              <TouchableOpacity className="border border-black rounded-3xl p-1 bg-[#EDF76A]">
                <Ionicons name="checkmark" size={30} color="black" />
              </TouchableOpacity>
            )
          }}
        />

        <View className="border-b-[1px] border-gray-500 w-full p-2 flex-row items-center">
          <Text className="text-gray-500">split between you and: </Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedFriendOrGroup(null);
              setIsSelected(false);
            }}
          >
            {selectedFriendOrGroup ? (
              <View className="flex-row border rounded-3xl px-2 py-1">
                <Text>{(selectedFriendOrGroup as Group).name ? (selectedFriendOrGroup as Group).name : (selectedFriendOrGroup as User).username}</Text>
                <Text className="pl-2">x</Text>
              </View>
            ) : (
              <Text className="text-slate-700">select friend or group</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* <View className="pt-2 items-center">
          <Text>if your friend's name does not appear in the list, </Text>
          <TouchableOpacity className="border border-black rounded-xl px-2 bg-[#F6D238]">
            <Text>add them</Text>
          </TouchableOpacity>
          <Text> first before adding an expense</Text>
        </View> */}

        {isSelected ? <ExpenseForm participants={users as User[]} group={group} percentage={splitPercentage} /> : <ExpenseParticipants setSelectedFriendOrGroup={setSelectedFriendOrGroup} setIsSelected={setIsSelected} availableFriends={availableFriends} availableGroups={availableGroups} />}
      </View>
    </TouchableWithoutFeedback>
  );
}
