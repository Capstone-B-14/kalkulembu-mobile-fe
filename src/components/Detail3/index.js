import React from "react";
import { View, Text } from "react-native";
import ChartMo from "../Grafik";
import SwitchButton from "../SwitchButton";

const Detail3 = () => {
  return (
    <View className='pt-5 pb-3 pl-5 pr-5'>
      <View className='bg-[#FBFBFB] items-center p-2 rounded-xl '>
        <Text className='font-bold'>Grafik Pertumbuhan Bobot Sapi (kg)</Text>
        <View className='mt-2'>
          <SwitchButton />
        </View>

        <View className=''>
          <ChartMo />
        </View>
      </View>
    </View>
  );
};

export default Detail3;
