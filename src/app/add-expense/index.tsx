import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import ExpenseForm from "@/src/components/ExpenseForm";
import { Link, Stack } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";
import ExpenseParticipants from "@/src/components/ExpenseParticipants";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";

export default async function AddExpenseModal() {
  const { user } = useAuth();

  const [selectedFriendOrGroup, setSelectedFriendOrGroup] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({ id: "", username: "" });
  const [selectedGroup, setSelectedGroup] = useState({ id: "", name: "", imageUrl: "", userIds: [], expenseIds: [] });

  let group: Group = { id: "", name: "", imageUrl: "", userIds: [], expenseIds: [] };
  let splitPercentage: number[] = [];
  let users = [];

  if (user?.id && selectedFriend?.id) {
    const { data, error } = await supabase
      .from("groups")
      .select()
      .eq("id", user?.id + "-" + selectedFriend.id);
    if (error) return error.message;
    if (data) group = data[0];
    if (!data) group = { id: user?.id + "-" + selectedFriend.id, name: selectedFriend.username, imageUrl: "", userIds: [user.id, selectedFriend.id], expenseIds: [] };
  } else if (selectedGroup) group = selectedGroup;

  const { data: groupUsers, error } = await supabase.from("users").select().in("id", group.userIds);
  if (error) console.log("Unable to fetch group users. Error: " + error);
  if (groupUsers) {
    console.log("groupUsers: " + JSON.stringify(groupUsers));
    users = groupUsers;
  }

  splitPercentage = Array(group.userIds.length).fill(100 / group.userIds.length);

  // return <ExpenseForm participants={users} group={group} percentage={splitPercentage} />;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="bg-pink-200 flex-1 items-center gap-y-5 pt-10">
        <Stack.Screen
          options={{
            title: "new expense",
            headerStyle: { backgroundColor: "#EDF76A" },
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
          <TouchableOpacity className="w-full">
            <TextInput placeholder="type friend's name" placeholderTextColor="gray" />
            <Text className="text-slate-700">select friend or group to split expense with</Text>
            <Text>{selectedFriend && selectedFriend.username}</Text>
            <Text>{selectedGroup && selectedGroup.name}</Text>
          </TouchableOpacity>
        </View>

        {selectedFriendOrGroup ? <ExpenseForm participants={users} group={group} percentage={splitPercentage} /> : <ExpenseParticipants selectedFriend={selectedFriend} setSelectedFriend={setSelectedFriend} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} setSelectedFriendOrGroup={setSelectedFriendOrGroup} />}
      </View>
    </TouchableWithoutFeedback>
  );
}
