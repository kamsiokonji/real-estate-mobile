import { Card } from "@/components/cards";
import Filters from "@/components/filters";
import NoResults from "@/components/no-results";
import Search from "@/components/search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();
  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter || "All",
      query: params.query || "",
      limit: 15,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter || "All",
      query: params.query || "",
      limit: 15,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Card onPress={() => handleCardPress(item.$id)} item={item} />
        )}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperClassName="px-5 flex gap-5"
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              className="text-primary-300 mt-2"
              size={"large"}
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5 flex flex-col gap-5">
            <View className="flex flex-row justify-between items-center">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-primary-200 p-2 rounded-full size-11 flex flex-row items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>

              <Text className="text-xl font-rubik-medium text-black-300">
                Search for Properties
              </Text>

              <TouchableOpacity>
                <Image source={icons.bell} className="size-5" />
              </TouchableOpacity>
            </View>

            <Search />

            <Filters />

            <View>
              <Text className="text-xl font-rubik-bold text-black-300">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
