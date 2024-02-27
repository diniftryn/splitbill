import { View, Text, TextInput, StyleSheet, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { Button } from "react-native-paper";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} className="bg-purple-300">
        <Stack.Screen
          options={{
            headerTitle: "Create Account",
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

        <Button onPress={signUpWithEmail} disabled={loading} className="mt-5 mb-3 bg-[#EDF76A]">
          <Text className="text-lg text-black">{loading ? "Signing Up..." : "Sign Up"}</Text>
        </Button>
        <Link href="/sign-in" style={styles.textButton}>
          Sign In
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
