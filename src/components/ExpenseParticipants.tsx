import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getFriends, getGroups } from "../api/queries";

export default function ExpenseParticipants({ selectedFriend, setSelectedFriend, selectedGroup, setSelectedGroup, setSelectedFriendOrGroup }: any) {
  const [availableFriends, setAvailableFriends] = useState();
  const [availableGroups, setAvailableGroups] = useState();

  const friends = getFriends();
  if (friends.data) {
    setAvailableFriends(friends.data);
    setSelectedFriendOrGroup(true);
  }

  const groups = getGroups();
  if (groups.data) {
    setAvailableGroups(groups.data);
    setSelectedFriendOrGroup(true);
  }

  return (
    <View className="border-b-[1px] border-gray-500 w-full p-2 flex-row items-center">
      <FlatList
        data={availableFriends}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedFriend(item);
            }}
          >
            <Text>{item.username}</Text>
          </TouchableOpacity>
        )}
        onEndReachedThreshold={1}
        contentInsetAdjustmentBehavior="automatic"
      />

      <FlatList
        data={availableGroups}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedGroup(item);
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        onEndReachedThreshold={1}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
}
