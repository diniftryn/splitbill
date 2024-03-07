import { View, Text, TouchableOpacity, Keyboard, Alert, FlatList, GestureResponderEvent, Button, Pressable, TouchableWithoutFeedback } from "react-native";
import { Link, Stack, router } from "expo-router";
import { Ionicons, Foundation } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Checkbox, TextInput as PaperTextInput } from "react-native-paper";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function AddGroupsScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [groupName, setGroupName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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

      if (data && data.friends_phone) {
        const { data: friends, error } = await supabase.from("users").select().in("phone", data.friends_phone);

        if (error) throw error;
        if (friends) {
          setAvailableUsers([...friends]);
          setUsers([...friends, data]);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const toggleCheckbox = (userId: string) => {
    setSelectedUserIds(prevSelectedUserIds => {
      if (prevSelectedUserIds.includes(userId)) {
        return prevSelectedUserIds.filter(id => id !== userId);
      } else {
        return [...prevSelectedUserIds, userId];
      }
    });
  };

  const handleSubmit = async (event: GestureResponderEvent) => {
    event.preventDefault();

    if (!groupName || !selectedUserIds) Alert.alert("Incomplete", "Please ensure that there is a group name and group members selected");
    else {
      const groupUserIds = [...selectedUserIds, session?.user.id];
      const submitData = { name: groupName, imageUrl, userIds: groupUserIds, expenseIds: [], type: "group" };
      console.log(submitData);

      const { data: dataCreateGroup, error: errorCreateGroup } = await supabase.from("groups").insert(submitData).select();
      if (errorCreateGroup) {
        console.log("Unable to add. Error: " + errorCreateGroup.message);
        return Alert.alert("Could not create group");
      }
      if (!errorCreateGroup) {
        groupUserIds.map(async userId => {
          const user = users.find(user => user.id === userId);
          const groupIdsToUpdate = user?.groupIds ? [...user.groupIds, dataCreateGroup[0].id] : [dataCreateGroup[0].id];
          console.log("userId: " + userId + " groupIdsToUpdate: " + groupIdsToUpdate);
          const { data: dataUpdateUserGroup, error: errorUpdateUserGroup } = await supabase.from("users").update({ groupIds: groupIdsToUpdate }).eq("id", userId).select();

          if (errorUpdateUserGroup) {
            console.log("Unable to update group users. Error: " + JSON.stringify(errorUpdateUserGroup));
            return Alert.alert("Could not update group users");
          }
          if (!errorUpdateUserGroup) {
            console.log("dataUpdateUserGroup " + JSON.stringify(dataUpdateUserGroup));
          }
        });
        Alert.alert("Group was successfully added!");
        router.replace("/(tabs)/groups");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center pt-20">
        <Stack.Screen
          options={{
            title: "new group",
            headerStyle: { backgroundColor: "#EDF76A" },
            headerRight: () => (
              <TouchableOpacity>
                <Ionicons name="add" size={30} color="black" />
              </TouchableOpacity>
            )
          }}
        />

        <Button title="Submit" onPress={handleSubmit} />

        <TouchableOpacity className="items-center px-5 py-3 border border-dashed border-black bg-pink-50" onPress={Keyboard.dismiss}>
          <Foundation name="camera" size={40} color="black" />
          <Text className="text-sm w-20 text-center">add group photo</Text>
        </TouchableOpacity>

        <View className="pt-10 min-w-[50vw]">
          <PaperTextInput label="Group Name" value={groupName} onChangeText={text => setGroupName(text)} />
          <PaperTextInput label="Image URL" value={imageUrl} onChangeText={text => setImageUrl(text)} />

          <FlatList
            className="pt-5"
            data={availableUsers}
            keyExtractor={item => item.id as string}
            renderItem={({ item }) => (
              <View className="flex flex-row items-center">
                <View className="border rounded-full">
                  <Checkbox status={selectedUserIds.includes(item.id as string) ? "checked" : "unchecked"} onPress={() => toggleCheckbox(item.id as string)} />
                </View>
                <Text className="text-lg pl-2">{item.username}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
