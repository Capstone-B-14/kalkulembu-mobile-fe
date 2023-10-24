import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CardSapiTotal = () => {
  return (
    <View className='p-4 h-[97px] w-[211px] bg-[#2E78A6] rounded-3xl'>
      <View className='flex flex-row justify-between mb-2'>
        <View className='flex basis-1/4 m-1'>
          <Icon name='cow' size={50} color='#FBFBFB' />
        </View>
        <View className='flex basis-2/3'>
          <Text
            className='text-[#FBFBFB]'
            style={{ fontFamily: "Roboto-Regular", fontSize: 18 }}
          >
            Total Sapi
          </Text>
          <View className='flex flex-row items-end'>
            <Text
              className='text-[#FBFBFB]'
              style={{
                fontFamily: "Raleway-Bold",
                fontSize: 32,
                fontWeight: "bold",
              }}
            >
              85
            </Text>
            <Text
              className='text-[#FBFBFB]'
              style={{ fontFamily: "Roboto-Regular", fontSize: 18 }}
            >
              ekor
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    background: "linear-gradient(to bottom, #2E78A6, #1C4965)",
  },
});

export default CardSapiTotal;
