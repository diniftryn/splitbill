import { View, Text, Button, GestureResponderEvent, Keyboard, Alert, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { supabase } from "@/src/lib/supabase";
import { Link, Stack, router } from "expo-router";
import { EvilIcons } from "@expo/vector-icons";

export default function AddExpenseModal() {
  const participants = [
    { id: "1", username: "Dini" },
    { id: "2", username: "Sher" }
  ];
  const group = { id: "43", name: "Coffee lover", expenseIds: [] };
  const percentage = [50, 50];

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [splitMethod, setSplitMethod] = useState("equally");
  const [splitAmounts, setSplitAmounts] = useState<number[]>([0, 0]);
  const [payerId, setPayerId] = useState("1");
  const [splitPercentage, setSplitPercentage] = useState<number[]>(percentage);

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

    const submitExpense = { description, amount, payerId, createdAt: new Date(), groupId: group.id };
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
            ),
            headerRight: () => <Button title="Submit" onPress={handleSubmit} />
          }}
        />

        <View className="w-[70vw] items-center">
          <View className="bg-[#EDF76A] w-full items-center rounded-t-xl border border-b-[0.5px] p-1">
            <Text className="text-lg font-medium">{formatDate(new Date())}</Text>
          </View>
          <View className="bg-[#FDF3FD] rounded-b-xl border border-t-[0.5px] p-3 pt-0 w-full">
            <TextInput className="border-b-[1px] text-lg text-black p-2" placeholder="expense description" placeholderTextColor="gray" value={description} onChangeText={setDescription} />
            <TextInput className="border-b-[1px] text-lg text-black p-2" placeholder="$0.00" placeholderTextColor="gray" value={amount} onChangeText={value => calculateSplitAmounts(value, splitMethod, splitPercentage)} keyboardType="numeric" />
          </View>
        </View>

        {/* <Link href="/add-expense/split-details" asChild>
          <TouchableOpacity className="py-2 px-5 border bg-purple-300 shadow-lg">
            <Text>paid by you and split equally</Text>
          </TouchableOpacity>
        </Link> */}

        <View className="flex-row items-center gap-x-5">
          <Text className="text-lg pb-1">paid by:</Text>
          {participants.map((user: any) => (
            <TouchableOpacity key={user.id} onPress={() => setPayerId(user.id)} className={`py-1 border rounded-3xl px-4 ${payerId === user.id && "bg-purple-300"}`}>
              <Text className="text-lg">{user.id == "1" ? "you" : user.username}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row w-[60vw]">
          <TouchableOpacity className={`flex-1 px-3 py-1 border border-r-[0.5px] ${splitMethod === "equally" && "bg-purple-300"}`} onPress={() => calculateSplitAmounts(amount, "equally", percentage)}>
            <Text className="text-base font-medium text-center">equally</Text>
          </TouchableOpacity>
          <TouchableOpacity className={`flex-1 px-3 py-1 border border-l-[0.5px] ${splitMethod === "custom" && "bg-purple-300"}`} onPress={() => calculateSplitAmounts(amount, "custom", Array(participants.length).fill(0))}>
            <Text className="text-base font-medium text-center">unequally</Text>
          </TouchableOpacity>
        </View>

        <View className="w-[80vw] border rounded-3xl bg-white py-5 px-3">
          {participants.map((user, index) => (
            <View key={index} className="flex flex-row items-center px-2">
              <Text className="w-1/3 text-lg">{user.id == "1" ? "you" : user.username}</Text>
              <View className="w-1/3">
                <TextInput className="w-20 border-b-2 text-center text-base" value={splitPercentage[index].toString()} onChangeText={value => handleSplitPercentageChange(value, index)} keyboardType="numeric" />
              </View>
              <View className="w-1/3 items-end">
                <TextInput className="w-20 border-b-2 text-base text-center" value={splitAmounts[index].toString()} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
