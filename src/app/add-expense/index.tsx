import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";
import { useAuth } from "@/src/providers/AuthProvider";
import ExpenseParticipants from "@/src/components/ExpenseParticipants";
import { useFriendList } from "@/src/api/friends";
import { useGroupList } from "@/src/api/groups";
import ExpenseFormFriend from "@/src/components/ExpenseFormFriend";
import ExpenseFormGroup from "@/src/components/ExpenseFormGroup";

export default function AddExpenseModal() {
  const { user } = useAuth();

  const [selectedFriendOrGroup, setSelectedFriendOrGroup] = useState<User | Group | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const { data: friends, error: friendsError, isLoading: friendsIsLoading } = useFriendList();
  const { data: groups, error: groupsError, isLoading: groupsIsLoading } = useGroupList();
  if (friendsIsLoading || groupsIsLoading) return <ActivityIndicator />;
  if (friendsError) return <Text>Failed to fetch friends</Text>;
  if (groupsError) return <Text>Failed to fetch groups</Text>;

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

        {isSelected && selectedFriendOrGroup && user ? selectedType === "friend" ? <ExpenseFormFriend user={user} selectedFriendOrGroup={selectedFriendOrGroup as User} /> : <ExpenseFormGroup user={user} selectedFriendOrGroup={selectedFriendOrGroup as Group} /> : <ExpenseParticipants setSelectedFriendOrGroup={setSelectedFriendOrGroup} setIsSelected={setIsSelected} setSelectedType={setSelectedType} availableFriends={friends} availableGroups={groups} />}
      </View>
    </TouchableWithoutFeedback>
  );
}
