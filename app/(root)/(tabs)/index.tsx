import { Card, FeaturedCard } from "@/components/cards";
import Filters from "@/components/filters";
import Search from "@/components/search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <Card />}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperClassName="px-5 flex gap-5"
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-10 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>

            <Search />

            <View className="my-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text=base text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={[1, 2, 3]}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => <FeaturedCard />}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerClassName="gap-5"
            />

            <View className="my-5">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text className="font-rubik-bold text=base text-primary-300">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
