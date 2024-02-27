import { View, Text, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { Button } from "react-native-paper";

export default function SignInScreen() {
  const [email, setEmail] = useState("dini@live.com.sg");
  const [password, setPassword] = useState("test123");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} className="bg-purple-300">
        <Stack.Screen
          options={{
            headerTitle: "Sign In",
            headerTintColor: "black",
            headerStyle: {
              backgroundColor: "#EDF76A"
            }
          }}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="your-email@gmail.com" placeholderTextColor="#000" style={styles.input} />

        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} placeholder="••••••••" placeholderTextColor="#000" style={styles.input} secureTextEntry />

        <Button onPress={signInWithEmail} disabled={loading} className="mt-5 mb-3 bg-[#EDF76A]">
          <Text className="text-lg text-black">{loading ? "Signing In..." : "Sign In"}</Text>
        </Button>
        <Link href="/sign-up" style={styles.textButton}>
          Sign Up
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1
  },
  label: {
    color: "black",
    fontSize: 16
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "400",
    marginVertical: 10,
    fontSize: 18
  }
});
