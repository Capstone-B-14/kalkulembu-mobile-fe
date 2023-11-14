import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CardSapiTotal = ({count}) => {
  return (
    <View className='p-4 bg-[#2E78A6] rounded-3xl flex justify-center sm: w-[155px] h-[155px]'>
      <View className='flex justify-between mb-2 sm: w-max'>
        <View className='sm:flex sm:basis-1/3'>
          <Icon name='cow' size={40} color='#FBFBFB' />
        </View>
        <View className='flex basis-1/2 sm: mb-4'>
          <View className='sm: mt-2'>
            <Text
              className='text-[#FBFBFB]'
              style={{ fontFamily: "Roboto-Regular", fontSize: 20 }}
            >
              Total Sapi
            </Text>
          </View>
          <View className='flex flex-row items-end'>
            <Text
              className='text-[#FBFBFB]'
              style={{
                fontFamily: "Raleway-Bold",
                fontSize: 38,
                fontWeight: "bold",
              }}
            >
              {count}
            </Text>
            <Text
              className='text-[#FBFBFB]'
              style={{ fontFamily: "Roboto-Regular", fontSize: 20 }}
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
