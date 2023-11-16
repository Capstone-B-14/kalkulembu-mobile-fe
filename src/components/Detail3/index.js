import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axiosInstance from "../../utils/axios";
import SwitchButton from "../SwitchButton";

const Detail3 = ({ averages }) => {
  return (
    <View className='pt-5 pb-3 pl-5 pr-5 shadow-lg'>
      <View className='bg-[#FBFBFB] items-center p-2 rounded-xl '>
        <Text className='font-bold'>Grafik Pertumbuhan Bobot Sapi (kg)</Text>
        <View className='mt-2'>
          <SwitchButton
            monthData={averages.monthlyAverage}
            yearData={averages.yearlyAverage}
          />
        </View>
      </View>
    </View>
  );
};

export default Detail3;
