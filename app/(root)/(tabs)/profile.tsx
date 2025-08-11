import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You've been logged ot successfully");
      refetch();
    } else {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row justify-between mt-5 items-center">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative gap-6">
            <Image
              source={{
                uri: user?.avatar,
              }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-12 right-3">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            <Text className="text-2xl font-rubik-bold">{user?.name}</Text>
          </View>
        </View>

        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />

          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem {...item} key={index} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  showArrow?: boolean;
  textStyle?: string;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  showArrow = true,
  textStyle,
}: SettingsItemProps) => {
  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-between py-3"
      onPress={onPress}
    >
      <View className="flex flex-row gap-2 items-center">
        <Image source={icon} className="size-6" />
        <Text
          className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}
        >
          {title}
        </Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className="size-5" />}
    </TouchableOpacity>
  );
};
