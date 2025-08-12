import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      console.log("Login successful");
      refetch();
    } else {
      Alert.alert("Login failed");
    }
  };

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.replace("/"); // Replace so user can't go back to SignIn
    }
  }, [loading, isLoggedIn]);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-2/3"
          resizeMode="contain"
        />

        <View className="px-10 flex flex-col gap-2">
          <Text className="text-base text-black-200 font-rubik uppercase text-center">
            Welcome to Restate
          </Text>

          <Text className="text-3xl text-black-300 font-rubik-bold uppercase text-center">
            Let's Get You Closer to {`\n`}{" "}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to Restate with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-3"
          >
            <View className="flex flex-row justify-center items-center gap-2">
              <Image
                source={icons.google}
                className="size-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
