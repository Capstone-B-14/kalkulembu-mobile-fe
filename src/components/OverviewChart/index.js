import React, { useState } from "react";
import {
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const OverviewChart = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handlePress = (value) => {
    setSelectedTab(value);
  };

  if (selectedTab == 0) {
    return (
      <View className=''>
        {/* Container Start*/}
        <View className='bg-[#FBFBFB] max-w-[380px] h-[400px] flex flex-col m-4 rounded rounded-3xl'>
          {/* Title Start*/}
          <View className='flex items-center my-4'>
            <Text className='text-lg font-bold'>Jumlah Sapi di Peternakan</Text>
          </View>
          {/* Title End */}
          {/* Switch Button */}
          <View className='flex flex-row justify-center mx-6 my-1'>
            <View className='bg-[#D9D9D9] flex flex-row rounded rounded-3xl w-[125px] h-[40px] justify-between'>
              <View className='bg-[#D9D9D9] rounded rounded-3xl'>
                <TouchableOpacity
                  style={{
                    backgroundColor: selectedTab == 0 ? "#FFDF64" : "#D9D9D9",
                  }}
                  className='rounded-3xl p-1 m-2 h-[25px]'
                  onPress={() => {
                    handlePress(0);
                  }}
                >
                  <Text className='font-bold'> Bulan </Text>
                </TouchableOpacity>
              </View>
              <View className='bg-[#D9D9D9] rounded-3xl'>
                <TouchableOpacity
                  style={{
                    backgroundColor: selectedTab == 1 ? "#FFDF64" : "#D9D9D9",
                  }}
                  className='rounded-3xl p-1 m-2 h-[25px]'
                  onPress={() => {
                    handlePress(1);
                  }}
                >
                  <Text className='font-bold'>Tahun</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Switch Button End */}
          {/* Chart Start */}
          <ScrollView horizontal={true} className='mx-4 my-6'>
            <LineChart
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Agt",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width}
              height={220}
              //yAxisLabel='Banyaknya Sapi (ekor)'
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#FBFBFB",
                backgroundGradientFrom: "#FBFBFB",
                backgroundGradientTo: "#FBFBFB",
                decimalPlaces: 0,
                color: (opacity = 1) => `#212121`,
                labelColor: (opacity = 1) => `#212121`,
                style: {
                  borderRadius: 0,
                },
              }}
              withHorizontalLabels={true}
            ></LineChart>
          </ScrollView>
        </View>
        {/* Container End */}
      </View>
    );
    // ==========================================BATAS CHART PER TAHUN=========================================
  } else {
    return (
      <View className=''>
        {/* Container Start*/}
        <View className='bg-[#FBFBFB] max-w-[380px] h-[400px] flex flex-col m-4 rounded rounded-3xl'>
          {/* Title Start*/}
          <View className='flex items-center my-4'>
            <Text className='text-lg font-bold'>Jumlah Sapi di Peternakan</Text>
          </View>
          {/* Title End */}
          {/* Switch Button */}
          <View className='flex flex-row justify-center mx-6 my-1'>
            <View className='bg-[#D9D9D9] flex flex-row rounded rounded-3xl w-[125px] h-[40px] justify-between'>
              <View className='bg-[#D9D9D9] rounded rounded-3xl'>
                <TouchableOpacity
                  style={{
                    backgroundColor: selectedTab == 0 ? "#FFDF64" : "#D9D9D9",
                  }}
                  className='rounded-3xl p-1 m-2 h-[25px]'
                  onPress={() => {
                    handlePress(0);
                  }}
                >
                  <Text className='font-bold'> Bulan </Text>
                </TouchableOpacity>
              </View>
              <View className='bg-[#D9D9D9] rounded-3xl'>
                <TouchableOpacity
                  style={{
                    backgroundColor: selectedTab == 1 ? "#FFDF64" : "#D9D9D9",
                  }}
                  className='rounded-3xl p-1 m-2 h-[25px]'
                  onPress={() => {
                    handlePress(1);
                  }}
                >
                  <Text className='font-bold'>Tahun</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Switch Button End */}
          {/* Chart Start */}
          <ScrollView horizontal={true} className='mx-4 my-6'>
            <LineChart
              data={{
                labels: ["2020", "2021", "2022", "2023"],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width}
              height={220}
              // yAxisLabel='Banyaknya Sapi (ekor)'
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#FBFBFB",
                backgroundGradientFrom: "#FBFBFB",
                backgroundGradientTo: "#FBFBFB",
                decimalPlaces: 0,
                color: (opacity = 1) => `#212121`,
                labelColor: (opacity = 1) => `#212121`,
                style: {
                  borderRadius: 0,
                },
              }}
              withHorizontalLabels={true}
            ></LineChart>
          </ScrollView>
        </View>
      </View>
    );
  }
};
export default OverviewChart;
