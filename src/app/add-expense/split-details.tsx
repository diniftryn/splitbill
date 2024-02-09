import { View, Text, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Stack } from "expo-router";
import React from "react";

export default function SplitDetailsScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 items-center bg-rose-50 gap-y-10 pt-10">
        <Stack.Screen
          options={{
            // headerTintColor: "#EDF76A",
            title: "",
            headerBackTitle: "",
            headerStyle: { backgroundColor: "#EDF76A" }
            // headerRight: () => (
            //   <TouchableOpacity onPress={handleAddExpense} className="border border-black rounded-3xl p-1 bg-[#EDF76A]">
            //     <Ionicons name="checkmark" size={30} color="black" />
            //   </TouchableOpacity>
            // )
          }}
        />

        <View className="flex-row items-center gap-x-5">
          <Text className="text-lg pb-1">paid by:</Text>
          <View className="pb-1 border rounded-3xl px-4 bg-purple-300">
            <Text className="text-lg">you</Text>
          </View>
          <View className="pb-1 ">
            <Text className="text-base">Gyuri</Text>
          </View>
        </View>

        <View className="flex-row w-[60vw]">
          <Pressable className="flex-1 px-3 py-1 border border-r-[0.5px] bg-purple-300">
            <Text className="text-base font-medium text-center">equally</Text>
          </Pressable>
          <Pressable className="flex-1 px-3 py-1 border border-l-[0.5px]">
            <Text className="text-base font-medium text-center">unequally</Text>
          </Pressable>
        </View>

        <View className="w-[80vw] border rounded-3xl bg-white py-5 px-3">
          <View className="flex-row pb-5 items-center">
            <View className="w-1/3">
              <Text className="text-base">you</Text>
            </View>
            <View className="w-1/3 items-center">
              <TextInput value="50%" className="w-10 border-b-2 py-1 text-center text-base" />
            </View>
            <View className="w-1/3 items-end">
              <TextInput value="$0.00" className="w-14 border-b-2 py-1 text-base text-center" />
            </View>
          </View>
          <View className="flex-row justify-between items-center">
            <View className="w-1/3">
              <Text className="text-base">Gyuri</Text>
            </View>
            <View className="w-1/3 items-center">
              <TextInput value="50%" className="w-10 border-b-2 py-1 text-center text-base" />
            </View>
            <View className="w-1/3 items-end">
              <TextInput value="$0.00" className="w-14 border-b-2 py-1 text-base text-center" />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
