import { Card, FeaturedCard } from "@/components/cards";
import Filters from "@/components/filters";
import NoResults from "@/components/no-results";
import Search from "@/components/search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
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

export default function Index() {
  const { user } = useGlobalContext();
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
      limit: 6,
    },
    skip: true,
  });

  const { data: latestProperties, loading: latestLoading } = useAppwrite({
    fn: getLatestProperties,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter || "All",
      query: params.query || "",
      limit: 6,
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

            {latestLoading ? (
              <ActivityIndicator
                className="text-primary-300 mt-2"
                size={"large"}
              />
            ) : !latestProperties || latestProperties.length === 0 ? (
              <NoResults />
            ) : (
              <FlatList
                data={latestProperties}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                  <FeaturedCard
                    onPress={() => {
                      handleCardPress(item.$id);
                    }}
                    item={item}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerClassName="gap-5"
              />
            )}

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
