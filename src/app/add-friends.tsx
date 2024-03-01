import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { Contact } from "expo-contacts";

export default function AddFriendsScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails]
        });

        if (data.length > 0) {
          setContacts(data);
          console.log(contacts);
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView className="mb-24">
      <Stack.Screen
        options={{
          title: "add friends",
          headerStyle: { backgroundColor: "#EDF76A" },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="add" size={30} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <View className="bg-white m-2 border rounded-3xl p-2 flex-row items-center">
        <Ionicons name="search" size={20} color="black" />
        <Text className="pl-1">search friends from contacts list</Text>
      </View>
      <ScrollView className="px-3">
        {contacts &&
          contacts.map(contact => (
            <Text key={contact.id} className="text-base py-2">
              {contact.name}
            </Text>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
