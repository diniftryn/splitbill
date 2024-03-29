import { View, Text, Button, GestureResponderEvent, Alert, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { Link, Stack, router } from "expo-router";
import { EvilIcons, Foundation, Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { decode } from "base64-arraybuffer";

export default function ExpenseForm({ userId, participants, group, percentage, initialSplitAmt }: { userId: string; participants: User[]; group: Group; percentage: number[]; initialSplitAmt: number[] }) {
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [splitMethod, setSplitMethod] = useState("equally");
  const [splitAmounts, setSplitAmounts] = useState<number[]>(initialSplitAmt);
  const [payerId, setPayerId] = useState(userId);
  const [splitPercentage, setSplitPercentage] = useState<number[]>(percentage);

  const [openDetails, setOpenDetails] = useState(false);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      permissionResult.canAskAgain = true;
      Alert.alert("You've refused to allow this app to access your camera!");
      return;
    } else if (permissionResult.granted === true) {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
      }
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("You've refused to allow this app to access your gallery!");
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      return;
    } else if (permissionResult.granted === true) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
      }
      // }
    }
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64"
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage.from("expense-images").upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      return data.path;
    }
  };

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  function calculateSplitAmounts(amount: string, method: string, percentage: number[]) {
    const splitAmounts = [];

    for (let i = 0; i < participants.length; i++) {
      splitAmounts[i] = (percentage[i] / 100) * parseFloat(amount);
    }
    setAmount(amount);
    setSplitMethod(method);
    setSplitPercentage(percentage);
    setSplitAmounts(splitAmounts);
  }

  function handleSplitPercentageChange(value: string, index: number) {
    const newPercentage = [...splitPercentage];
    newPercentage[index] = parseInt(value);
    setSplitPercentage(newPercentage);
    const newSplitAmounts = [...splitAmounts];
    newSplitAmounts[index] = (parseInt(value) / 100) * parseFloat(amount);
    setSplitAmounts(newSplitAmounts);
  }

  async function handleSubmit(event: GestureResponderEvent) {
    event.preventDefault();

    const imagePath = await uploadImage();

    const submitExpense = { description, amount, payerId, createdAt: new Date(), groupId: group.id, image: imagePath };
    console.log(submitExpense);
    const { data: dataExpense, error: errorExpense } = await supabase.from("expenses").insert(submitExpense).select();
    if (errorExpense) console.log("Unable to add. Error: " + JSON.stringify(errorExpense));
    console.log("dataExpense " + JSON.stringify(dataExpense));

    if (dataExpense) {
      let submitParticipants = [];
      for (let i = 0; i < participants.length; i++) {
        submitParticipants.push({ expenseId: dataExpense[0].id, userId: participants[i].id, shareAmount: splitAmounts[i] });
      }
      const { data: dataParticipant, error: errorParticipant } = await supabase.from("participants").insert(submitParticipants).select();
      if (errorParticipant) console.log("Unable to add. Error: " + errorParticipant);
      if (dataParticipant) {
        console.log(JSON.stringify(dataParticipant) + " successfully added");

        const expenseIdsToUpdate = group.expenseIds ? [...group.expenseIds, dataExpense[0].id] : [dataExpense[0].id];

        const { data: dataUpdateGroupExpenses, error: errorUpdateGroupExpenses } = await supabase.from("groups").update({ expenseIds: expenseIdsToUpdate }).eq("id", group.id).select();

        if (errorUpdateGroupExpenses) {
          console.log("Unable to update group users. Error: " + JSON.stringify(errorUpdateGroupExpenses));
          Alert.alert("Could not update group users");
        }
        if (!errorUpdateGroupExpenses) {
          console.log("dataUpdateGroupExpenses " + JSON.stringify(dataUpdateGroupExpenses));
          router.replace("/(tabs)/groups");
        }
      }
    }
  }

  return (
    <View>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity className="border border-black rounded-3xl p-1 bg-[#EDF76A]" onPress={handleSubmit}>
              <Ionicons name="checkmark" size={30} color="black" />
            </TouchableOpacity>
          )
        }}
      />

      <View className="items-center gap-y-10 flex-1">
        <View className={openDetails ? "hidden" : "pt-10 w-[70vw] items-center"}>
          <View className="bg-[#EDF76A] w-full items-center rounded-t-xl border border-b-[0.5px] p-1">
            <Text className="text-lg font-medium">{formatDate(new Date())}</Text>
          </View>
          <View className="bg-[#FDF3FD] rounded-b-xl border border-t-[0.5px] p-3 pt-0 w-full">
            <TextInput className="border-b-[1px] text-lg text-black p-2" placeholder="expense description" placeholderTextColor="gray" value={description} onChangeText={text => setDescription(text)} />
            <TextInput className="border-b-[1px] text-lg text-black p-2" placeholder="$0.00" placeholderTextColor="gray" value={amount} onChangeText={value => calculateSplitAmounts(value, splitMethod, splitPercentage)} keyboardType="numeric" />
          </View>
        </View>

        <View className={openDetails ? "grid items-center gap-y-5" : "hidden"}>
          <View className="flex-row items-center gap-x-5">
            <Text className="text-lg pb-1">paid by:</Text>
            {participants.length > 0 &&
              participants.map((user: any) => (
                <TouchableOpacity key={user.id} onPress={() => setPayerId(user.id)} className={`py-1 border rounded-3xl px-4 ${payerId === user.id && "bg-purple-300"}`}>
                  <Text className="text-lg">{user.id == userId ? "you" : user.username}</Text>
                </TouchableOpacity>
              ))}
          </View>

          <View className="flex-row w-[60vw]">
            <TouchableOpacity className={`flex-1 px-3 py-1 border border-r-[0.5px] ${splitMethod === "equally" && "bg-purple-300"}`} onPress={() => calculateSplitAmounts(amount, "equally", percentage)}>
              <Text className="text-base font-medium text-center">equally</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`flex-1 px-3 py-1 border border-l-[0.5px] ${splitMethod === "unequally" && "bg-purple-300"}`} onPress={() => calculateSplitAmounts(amount, "unequally", Array(participants.length).fill(0))}>
              <Text className="text-base font-medium text-center">unequally</Text>
            </TouchableOpacity>
          </View>

          <View className="w-[80vw] border rounded-3xl bg-white py-5 px-3">
            {participants.map((user, index) => (
              <View key={index} className="flex flex-row items-center px-2">
                <Text className="w-1/3 text-lg">{user.id == userId ? "you" : user.username}</Text>
                <View className="w-1/3">
                  <TextInput className="w-20 border-b-2 text-center text-base pb-1" value={splitPercentage[index].toString()} onChangeText={value => handleSplitPercentageChange(value, index)} keyboardType="numeric" />
                </View>
                <View className="w-1/3 items-end">
                  <TextInput className="w-20 pb-1 text-base text-center" value={splitAmounts[index].toString()} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity className="py-2 px-5 border bg-purple-300 shadow-lg mt-10 mb-5" onPress={() => setOpenDetails(!openDetails)}>
          {openDetails ? (
            <Text>Go Back</Text>
          ) : (
            <Text>
              paid by {payerId == userId ? "you" : participants.find(user => user.id === payerId)?.username} and split {splitMethod}
            </Text>
          )}
        </TouchableOpacity>

        <View className={openDetails ? "hidden" : "block"}>
          <TouchableOpacity className="items-center px-2 border border-dashed border-black bg-[#FDF3FD]" onPress={openCamera}>
            {image ? (
              <View className="pt-2">
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                <Button title="delete image" onPress={() => setImage("")} />
              </View>
            ) : (
              <View className="items-center p-2">
                <Foundation name="camera" size={40} color="black" />
                <Text className="text-base">add receipt</Text>
                <Text className="text-gray-500 text-xs">(optional)</Text>
              </View>
            )}
          </TouchableOpacity>
          <Button title="or choose from gallery" onPress={pickImage} />
        </View>
      </View>
    </View>
  );
}
