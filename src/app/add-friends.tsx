import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, GestureResponderEvent, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

export default function AddFriendsScreen() {
  const { user } = useAuth();

  const phones: string[] = [];
  const [contacts, setContacts] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers]
        });

        if (data.length > 0) {
          data.forEach(contact => contact.phoneNumbers && phones.push(contact.phoneNumbers[0].number as string));

          const { data: existingUsers, error } = await supabase.from("users").select().in("phone", phones);
          if (!error) setContacts(existingUsers);

          console.log(contacts);
        }
      }
    })();
  }, []);

  async function handleAddFriend(phone: string) {
    console.log(user);
    const friendPhonesToUpdate = user?.friends_phone ? [...user.friends_phone, phone] : [phone];

    const { data: dataUpdateFriends, error } = await supabase.from("users").update({ friends_phone: friendPhonesToUpdate }).eq("id", user?.id).select();
    if (error) alert("Error: " + error.message);
    if (dataUpdateFriends) {
      Alert.alert("friend added");
      router.push("/");
    }
  }

  return (
    <SafeAreaView className="mb-24">
      <Stack.Screen
        options={{
          title: "add friends",
          headerStyle: { backgroundColor: "#EDF76A" }
          // headerRight: () => (
          //   <TouchableOpacity>
          //     <Ionicons name="add" size={30} color="black" />
          //   </TouchableOpacity>
          // )
        }}
      />
      <TouchableOpacity className="flex flex-row items-center gap-x-2 py-2 pl-2 border-b">
        <Ionicons name="add" size={20} color="black" />
        <Text className="text-base">add friend if their name does not appear below</Text>
      </TouchableOpacity>

      {/* <View className="bg-white m-2 border rounded-3xl p-2 flex-row items-center">
        <Ionicons name="search" size={20} color="black" />
        <Text className="pl-1">search friends from contacts list</Text>
      </View> */}

      <ScrollView className="px-3">
        <Text>
          {user?.friends_phone} {user?.phone} {JSON.stringify(user)}
        </Text>
        {contacts &&
          contacts.map(contact => (
            <TouchableOpacity key={contact.id} onPress={() => handleAddFriend(contact.phone as string)} className="py-2">
              <Text className="text-base">{contact.username}</Text>
              <Text className="text-sm text-gray-400">{contact.phone}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
