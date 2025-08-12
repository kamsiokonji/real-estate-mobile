import Comment from "@/components/comments";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Property() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: property, loading } = useAppwrite({
    fn: getPropertyById,
    params: { id: id! }, // object, not array
    skip: !id,
  });

  const windowHeight = Dimensions.get("window").height;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-primary-300" />
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>No property found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative w-ful" style={{ height: windowHeight / 2 }}>
          {/* Property Image */}
          <Image
            source={{ uri: property?.image }}
            className="w-full h-full"
            resizeMode="cover"
          />

          {/* Overlayed Header Buttons */}
          <View className="absolute top-20 left-5 right-5 flex flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-transparent p-2 rounded-full"
            >
              <Image source={icons.backArrow} className="size-5" />
            </TouchableOpacity>

            <View className="flex flex-row items-center gap-2">
              <TouchableOpacity className="bg-transparent p-2 rounded-full">
                <Image
                  source={icons.heart}
                  className="size-5"
                  tintColor={"#191D31"}
                />
              </TouchableOpacity>
              <TouchableOpacity className="bg-transparent p-2 rounded-full">
                <Image source={icons.send} className="size-5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="p-5">
          <View className="flex flex-col gap-5">
            <Text className="text-2xl font-rubik-extraBold text-black-300">
              {property?.name}
            </Text>

            <View className="flex flex-row gap-3 items-center">
              <View className="p-2 bg-primary-100 rounded-full w-fit">
                <Text className="text-base font-rubik-semiBold text-primary-300 capitalize">
                  {property?.type}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-1">
                <Image source={icons.star} className="size-5" />

                <Text className="text-base font-rubik-medium text-black-300">
                  {property?.rating} ({property?.reviews.length} reviews)
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-1">
                <View className="p-2 bg-primary-100 rounded-full w-fit">
                  <Image source={icons.bed} className="size-5" />
                </View>

                <Text className="text-base font-rubik-medium text-black-300">
                  {property?.bedrooms} Beds
                </Text>
              </View>

              <View className="flex flex-row items-center gap-1">
                <View className="p-2 bg-primary-100 rounded-full w-fit">
                  <Image source={icons.bath} className="size-5" />
                </View>

                <Text className="text-base font-rubik-medium text-black-300">
                  {property?.bathrooms} Bathrooms
                </Text>
              </View>

              <View className="flex flex-row items-center gap-1">
                <View className="p-2 bg-primary-100 rounded-full w-fit">
                  <Image source={icons.area} className="size-5" />
                </View>

                <Text className="text-base font-rubik-medium text-black-300">
                  {property?.area} Sqft
                </Text>
              </View>
            </View>

            <View className="border-t border-primary-200 mt-5 flex flex-col gap-3">
              <Text className="text-xl font-rubik-semiBold text-black-300 mt-5">
                Agent
              </Text>

              <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-3">
                  <Image
                    source={images.avatar}
                    className="size-16 rounded-full"
                  />

                  <View>
                    <Text className="text-lg font-rubik-semiBold text-black-300">
                      {property?.agent.name}
                    </Text>
                    <Text className="text-base font-rubik-medium text-black-100">
                      {property?.agent?.email}
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center gap-2">
                  <TouchableOpacity className="p-2 bg-primary-100 rounded-full w-fit">
                    <Image source={icons.phone} className="size-5" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 bg-primary-100 rounded-full w-fit">
                    <Image source={icons.chat} className="size-5" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <Text className="text-xl font-rubik-semiBold text-black-300 mt-5">
                Overview
              </Text>
              <Text className="text-lg font-rubik-medium text-black-100 mt-2">
                {property?.description}
              </Text>
            </View>

            <View className="flex flex-col gap-5">
              <Text className="text-xl font-rubik-semiBold text-black-300 mt-5">
                Facilities
              </Text>
              {property?.facilities.length > 0 && (
                <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                  {property?.facilities.map((item: string, index: number) => {
                    // @ts-ignore
                    const facility = facility?.find(
                      (facility: any) => facility.title === item
                    );

                    return (
                      <View
                        key={index}
                        className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                      >
                        <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                          <Image
                            source={facility ? facility.icon : icons.info}
                            className="size-6"
                          />
                        </View>

                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          className="text-black-300 text-sm text-center font-rubik mt-1.5 capitalize"
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>

            {property?.gallery.length > 0 && (
              <View className="mt-7">
                <Text className="text-black-300 text-xl font-rubik-bold">
                  Gallery
                </Text>
                <FlatList
                  contentContainerStyle={{ paddingRight: 20 }}
                  data={property?.gallery}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item.image }}
                      className="size-40 rounded-xl"
                    />
                  )}
                  contentContainerClassName="flex gap-4 mt-3"
                  bounces={false}
                />
              </View>
            )}

            <View className="mt-7">
              <Text className="text-black-300 text-xl font-rubik-bold">
                Location
              </Text>
              <View className="flex flex-row items-center justify-start mt-4 gap-2">
                <Image source={icons.location} className="w-7 h-7" />
                <Text className="text-black-200 text-sm font-rubik-medium">
                  {property?.address}
                </Text>
              </View>

              <Image
                source={images.map}
                className="h-52 w-full mt-5 rounded-xl"
              />
            </View>

            {property?.reviews.length > 0 && (
              <View className="mt-7">
                <View className="flex flex-row items-center justify-between">
                  <View className="flex flex-row items-center">
                    <Image source={icons.star} className="size-6" />
                    <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                      {property?.rating} ({property?.reviews.length} reviews)
                    </Text>
                  </View>

                  <TouchableOpacity>
                    <Text className="text-primary-300 text-base font-rubik-bold">
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="mt-5">
                  <Comment item={property?.reviews[0]} />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-black-200 text-xs font-rubik-medium">
              Price
            </Text>
            <Text
              numberOfLines={1}
              className="text-primary-300 text-start text-2xl font-rubik-bold"
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
            <Text className="text-white text-lg text-center font-rubik-bold">
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
