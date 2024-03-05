import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Alert } from "react-native";
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

    if (user?.friends_phone && user?.friends_phone.includes(phone)) return Alert.alert("already in friend's list", " add other friends?");

    const friendPhonesToUpdate = user?.friends_phone ? !user?.friends_phone.includes(phone) && [...user.friends_phone, phone] : [phone];

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

      {/* <View className="bg-white m-2 border rounded-3xl p-2 flex-row items-center">
        <Ionicons name="search" size={20} color="black" />
        <Text className="pl-1">search friends from contacts list</Text>
      </View> */}

      <ScrollView>
        <View className="px-3">
          <Text className="py-2">From your contacts who are already on the app</Text>
          {contacts &&
            contacts
              .sort((a, b) => a.username.localeCompare(b.username))
              .map(contact => (
                <View className="border-b border-b-gray-200">
                  <TouchableOpacity key={contact.id} onPress={() => handleAddFriend(contact.phone as string)} className="py-2">
                    <Text className="text-base">{contact.username}</Text>
                    <Text className="text-sm text-gray-400">{contact.phone}</Text>
                  </TouchableOpacity>
                </View>
              ))}
        </View>

        <TouchableOpacity className="flex flex-row justify-center gap-x-2 py-2 bg-white mt-5">
          <Text className="text-base">can't find your friends? send an invite</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
