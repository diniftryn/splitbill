import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";

export default function ExpenseParticipants({ setSelectedFriendOrGroup, setIsSelected, setSelectedType, availableFriends, availableGroups }: any) {
  return (
    <View className="w-full">
      <View className="px-5 py-2">
        <Text className="text-gray-600 text-base">Friends:</Text>
        {availableFriends ? (
          <FlatList
            data={availableFriends}
            keyExtractor={item => item.id as string}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-1"
                onPress={() => {
                  setSelectedFriendOrGroup(item);
                  setIsSelected(true);
                  setSelectedType("friend");
                }}
              >
                <Text className="text-base">{item.username}</Text>
              </TouchableOpacity>
            )}
            onEndReachedThreshold={1}
            contentInsetAdjustmentBehavior="automatic"
          />
        ) : (
          <Text>No friends added yet</Text>
        )}
      </View>

      <View className="px-5 py-2">
        <Text className="text-gray-600 text-base">Groups:</Text>
        {availableGroups ? (
          <FlatList
            data={availableGroups}
            keyExtractor={item => item.id as string}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-1"
                onPress={() => {
                  setSelectedFriendOrGroup(item);
                  setIsSelected(true);
                  setSelectedType("group");
                }}
              >
                <Text className="text-base">{item.name}</Text>
              </TouchableOpacity>
            )}
            onEndReachedThreshold={1}
            contentInsetAdjustmentBehavior="automatic"
          />
        ) : (
          <Text>No grops added yet</Text>
        )}
      </View>
    </View>
  );
}
