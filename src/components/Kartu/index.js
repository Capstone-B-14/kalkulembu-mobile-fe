import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Kartu = ({ photo, name, weight, healthy, onPress }) => {
  const getKondisiLabel = () => {
    if (healthy) {
      return (
        <View className='bg-[#A3BFD9] w-[45px] h-[20px] rounded-lg items-center justify-center'>
          <Text className='text-xs font-bold'>Sehat</Text>
        </View>
      );
    } else if (!healthy) {
      return (
        <View className='bg-[#E78383] w-[45px] h-[20px] rounded-lg items-center justify-center'>
          <Text className='text-xs font-bold'>Sakit</Text>
        </View>
      );
    } else {
      return "Unknown";
    }
  };

  return (
    <TouchableOpacity className='mx-4 my-4' onPress={onPress}>
      <View className='bg-[#FFFFFF] p-2 rounded-xl w-[170px] h-[230px] shadow-lg flex flex-col drop-shadow-lg'>
        <View className='flex items-center'>
          <View className='bg-transparent w-[150px] h-[150px] rounded-xl'>
            <Image
              source={{ uri: photo }}
              style={{ width: 150, height: 150, borderRadius: 8 }}
            />
          </View>
        </View>
        <View className='flex flex-row my-3'>
          <View className='flex basis-1/2 mx-2'>
            <Text className='text-lg font-bold'>{name}</Text>
            <Text className='text-md font-medium'>{weight} kg</Text>
          </View>
          <View
            className={`mx-2 my-1 w-[55px] h-[25px] rounded-lg ${getKondisiLabel(
              healthy
            )}`}
          >
            {typeof getKondisiLabel(healthy) === "object" ? (
              getKondisiLabel(healthy)
            ) : (
              <Text className='text-md font-bold'>{healthy}</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Kartu;
