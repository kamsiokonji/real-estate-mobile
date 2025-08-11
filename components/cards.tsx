import icons from "@/constants/icons";
import images from "@/constants/images";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
}

export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="font-rubik-bold text-xs text-primary-300 ml-1">
          4.4
        </Text>
      </View>

      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Text className="text-white font-rubik-bold text-xl" numberOfLines={1}>
          Modern Apartment
        </Text>
        <Text className="text-white font-rubik text-base" numberOfLines={1}>
          22 St, New York
        </Text>{" "}
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extraBold text-white">
            $2,000
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 flex-col items-start w-full relative"
    >
      <View className="flex flex-row items-center bg-white/90 px-3 rounded-full absolute top-5 right-5 z-50 p-1">
        <Image source={icons.star} className="size-2.5" />
        <Text className="font-rubik-bold text-xs text-primary-300 ml-0.5">
          4.4
        </Text>
      </View>

      <Image source={images.newYork} className="w-full rounded-lg h-40" />

      <View className="flex flex-col mt-2">
        <Text
          className="text-black-300 font-rubik-bold text-base"
          numberOfLines={1}
        >
          Cozy Studio Apartment
        </Text>
        <Text className="text-black-200 font-rubik text-xs" numberOfLines={1}>
          22 St, New York
        </Text>{" "}
        <View className="flex flex-row items-center justify-between mt-2">
          <Text className="text-base font-rubik-bold text-primary-300">
            $2,000
          </Text>
          <Image
            source={icons.heart}
            className="size-5"
            tintColor={"#191d31"}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
