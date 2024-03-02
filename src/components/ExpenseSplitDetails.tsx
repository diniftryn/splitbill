import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";

export default function ExpenseSplitDetails({ participants, amount, percentage, splitPercentage, setSplitPercentage, splitAmounts, setSplitAmounts, splitMethod, payerId, setPayerId, calculateSplitAmounts }: any) {
  function handleSplitPercentageChange(value: string, index: number) {
    const newPercentage = [...splitPercentage];
    newPercentage[index] = parseInt(value);
    setSplitPercentage(newPercentage);
    const newSplitAmounts = [...splitAmounts];
    newSplitAmounts[index] = (parseInt(value) / 100) * parseFloat(amount);
    setSplitAmounts(newSplitAmounts);
  }

  return (
    <View className="grid items-center gap-y-5">
      <View className="flex-row items-center gap-x-5">
        <Text className="text-lg pb-1">paid by:</Text>
        {participants.length > 0 &&
          participants.map((user: any) => (
            <TouchableOpacity key={user.id} onPress={() => setPayerId(user.id)} className={`py-1 border rounded-3xl px-4 ${payerId === user.id && "bg-purple-300"}`}>
              <Text className="text-lg">{user.id == "1" ? "you" : user.username}</Text>
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
        {participants.map((user: User, index: number) => (
          <View key={index} className="flex flex-row items-center px-2">
            <Text className="w-1/3 text-lg">{user.id == "1" ? "you" : user.username}</Text>
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
  );
}
