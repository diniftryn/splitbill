import { View, Text, Button, GestureResponderEvent, TouchableOpacity, Keyboard, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { RadioButton, TextInput } from "react-native-paper";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";

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
  const [payerId, setPayerId] = useState("");
  const [splitPercentage, setSplitPercentage] = useState<number[]>(percentage);

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
    <TouchableOpacity onPress={Keyboard.dismiss}>
      <View>
        <Button title="Submit" onPress={handleSubmit} />

        <Text>Description:</Text>
        <TextInput value={description} onChangeText={setDescription} />

        <Text>Amount:</Text>
        <TextInput value={amount} onChangeText={value => calculateSplitAmounts(value, splitMethod, splitPercentage)} keyboardType="numeric" />

        <Text>Split Method:</Text>
        <View>
          <RadioButton.Group
            onValueChange={value => {
              if (value === "equally") calculateSplitAmounts(amount, value, percentage);
              if (value === "custom") calculateSplitAmounts(amount, "custom", Array(participants.length).fill(0));
            }}
            value={splitMethod}
          >
            <View className="flex flex-row">
              <View className="flex flex-row items-center">
                <View className="rounded-full border">
                  <RadioButton value="equally" />
                </View>
                <Text className="pl-2">Split Equally</Text>
              </View>
              <View className="flex flex-row items-center">
                <View className="rounded-full border">
                  <RadioButton value="custom" />
                </View>
                <Text className="pl-2">Custom Split</Text>
              </View>
            </View>
          </RadioButton.Group>

          <View>
            {participants.map((user, index) => (
              <View key={index} className="flex flex-row">
                <Text>{user.username}</Text>
                <TextInput className="mx-2" value={splitPercentage[index].toString()} onChangeText={value => handleSplitPercentageChange(value, index)} keyboardType="numeric" />
                <TextInput value={splitAmounts[index].toString()} readOnly />
              </View>
            ))}
          </View>
        </View>

        <Text>Payer:</Text>
        <Text>Selected payerId: {payerId}</Text>
        <Picker id="payerId" selectedValue={payerId} onValueChange={(value: string) => setPayerId(value)}>
          <Picker.Item label="Select Payer" value="equal" />
          {participants.map((user: any) => (
            <Picker.Item key={user.id} label={user.username} value={user.id} />
          ))}
        </Picker>
      </View>
    </TouchableOpacity>
  );
}
