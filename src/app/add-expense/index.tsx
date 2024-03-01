import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import ExpenseForm from "@/src/components/ExpenseForm";
import ExpenseParticipants from "@/src/components/ExpenseParticipants";
import { useFriendGroup, useFriendList } from "@/src/api/friends";
import { useGroupList, useGroupUsers } from "@/src/api/groups";

export default function AddExpenseModal() {
  const { user } = useAuth();

  const [selectedFriendOrGroup, setSelectedFriendOrGroup] = useState<User | Group | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  let group: Group = { id: "", name: "", imageUrl: "", userIds: [], expenseIds: [] };
  let splitPercentage: number[] = [50, 50];
  let users: [User | null] | User[] = [user];

  const { data: friends, error: friendsError, isLoading: friendsIsLoading } = useFriendList();
  const { data: groups, error: groupsError, isLoading: groupsIsLoading } = useGroupList();
  if (friendsIsLoading || groupsIsLoading) return <ActivityIndicator />;
  if (friendsError) return <Text>Failed to fetch friends</Text>;
  if (groupsError) return <Text>Failed to fetch groups</Text>;

  // if (user && selectedFriendOrGroup && (selectedFriendOrGroup as User).username) {
  //   const { data: friendGroup, error: friendGroupError, isLoading: friendGroupIsLoading } = useFriendGroup(user.id, selectedFriendOrGroup.id);
  //   if (friendGroupIsLoading) return <ActivityIndicator />;
  //   if (friendGroupError) return <Text>Failed to fetch friend group</Text>;

  //   if (friendGroup) group = friendGroup[0] as Group;
  //   users = [user, selectedFriendOrGroup] as User[];
  // } else if (user && selectedFriendOrGroup && (selectedFriendOrGroup as Group).name) {
  //   group = selectedFriendOrGroup as Group;
  //   const { data: groupUsers, error: groupUsersError, isLoading: groupUsersIsLoading } = useGroupUsers(group.userIds as string[]);
  //   if (groupUsersIsLoading) return <ActivityIndicator />;
  //   if (groupUsersError) return <Text>Failed to fetch group users</Text>;

  //   users = groupUsers as User[];
  //   splitPercentage = Array(group.userIds.length).fill(100 / group.userIds.length);
  // }

  async function getFriendGroup(userId: string | number, friendId: string | number) {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .in("userIds", [
        [userId, friendId],
        [friendId, userId]
      ])
      .eq("type", "friend");

    if (error) console.log("Unable to fetch friend group. Error: " + error.message);
    if (data) group = data[0];
    if (!data) console.log("add person as friend first");
  }

  async function getUsers(groupUserIds: number[]) {
    const { data: groupUsers, error } = await supabase.from("users").select().in("id", groupUserIds);
    if (error) console.log("Unable to fetch group users. Error: " + error.message);
    if (groupUsers) {
      console.log("groupUsers: " + JSON.stringify(groupUsers));
      users = groupUsers as User[];
    }
  }

  if (user && selectedFriendOrGroup && (selectedFriendOrGroup as User).username) {
    getFriendGroup(user.id, selectedFriendOrGroup.id);
    users = [user, selectedFriendOrGroup] as User[];
  } else if (user && selectedFriendOrGroup && (selectedFriendOrGroup as Group).name) {
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

        {isSelected ? <ExpenseForm participants={users as User[]} group={group} percentage={splitPercentage} /> : <ExpenseParticipants setSelectedFriendOrGroup={setSelectedFriendOrGroup} setIsSelected={setIsSelected} availableFriends={friends} availableGroups={groups} />}
      </View>
    </TouchableWithoutFeedback>
  );
}
