import { View, Text, TextInput, Image, TouchableOpacity, Button } from "react-native";
import { Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";

export default function SettingsScreen() {
  const { user } = useAuth();

  return (
    <View className="flex-1 justify-center items-center bg-rose-50">
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />

      <View className="w-[70vw]">
        <View className="w-full border border-b-[0.5px] rounded-t-3xl  bg-[#EDF76A] py-2 flex-row justify-center items-center">
          <Text className="text-lg font-semibold">profile</Text>

          <TouchableOpacity>
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="w-full border border-t-[0.5px] rounded-b-3xl py-5 flex justify-center items-center bg-white">
          <Image source={require("@/assets/images/clouds1.jpeg")} className="w-[90px] h-[90px] border rounded-full mb-5" />
          <View className="bg-pink-200 w-3/4 flex items-center pb-3 mb-3">
            <TextInput className="text-lg font-medium pb-2" value={user?.username} />
            <TextInput className=" font-normal" value={user?.phone} />
          </View>

          <Button title="Logout" onPress={async () => await supabase.auth.signOut()} />
        </View>
      </View>
    </View>
  );
}
