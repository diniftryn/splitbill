import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";

export default function ExpenseParticipants({ setSelectedFriendOrGroup, setIsSelected, availableFriends, availableGroups }: any) {
  return (
    <View className="w-full">
      <View className="px-5 py-2">
        <Text className="text-gray-600 text-base">Friends:</Text>
        <FlatList
          data={availableFriends}
          keyExtractor={(item, index) => (item.id as string) + item.username + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="py-1"
              onPress={() => {
                setSelectedFriendOrGroup(item);
                setIsSelected(true);
              }}
            >
              <Text className="text-base">{item.username}</Text>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={1}
          contentInsetAdjustmentBehavior="automatic"
        />
      </View>

      <View className="px-5 py-2">
        <Text className="text-gray-600 text-base">Groups:</Text>
        <FlatList
          data={availableGroups}
          keyExtractor={(item, index) => (item.id as string) + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="py-1"
              onPress={() => {
                setSelectedFriendOrGroup(item);
                setIsSelected(true);
              }}
            >
              <Text className="text-base">{item.name}</Text>
            </TouchableOpacity>
          )}
          onEndReachedThreshold={1}
          contentInsetAdjustmentBehavior="automatic"
        />
      </View>
    </View>
  );
}
