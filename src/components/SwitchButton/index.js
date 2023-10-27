import React, { useState } from 'react';
import { View, Text,  Pressable, TouchableOpacity,StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import ChartMo from '../Grafik';

const SwitchButton = ({}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    // const [showChart, setShowChart] = useState(0);

    const handlePress = (value) => {
        setSelectedTab(value);
        // setShowChart(value);
      };

    if (selectedTab == 0) {
        return (
            <View>
        <View className="bg-[#D9D9D9] flex-row p-1.5 rounded-3xl justify-center ml-[114px] mr-[114px]">
            <View className="bg-[#D9D9D9] rounded-xl">
                <TouchableOpacity style={{backgroundColor: selectedTab == 0 ? '#FFDF64' : '#D9D9D9'}} className=" rounded-2xl p-1.5"
                onPress={() => {handlePress(0)}}>
                    <Text > Bulan </Text>
                </TouchableOpacity>
            </View>
            <View className="bg-[#D9D9D9] rounded-xl">

            <TouchableOpacity style={{backgroundColor: selectedTab == 1 ? '#FFDF64' : '#D9D9D9'}} className="bg-[#D9D9D9] rounded-2xl p-1.5"
            onPress={() => {handlePress(1)}}>
                    <Text>Tahun</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View className="w-full">
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May'],
          datasets: [
            {
              data: [
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
        width={350} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=" Kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#FBFBFB',
          backgroundGradientFrom: '#FBFBFB',
          backgroundGradientTo: '#FBFBFB',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `#212121`,
          labelColor: (opacity = 1) => `#212121`,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#212121',
          },
        }}
        false
        style={{
          marginVertical: 8,
          borderRadius: 0,
        }}
      />
    </View>

        </View>
        )
    } else {
        return (
            <View>
        <View className="bg-[#D9D9D9] flex-row p-1.5 rounded-3xl justify-center ml-[114px] mr-[114px]">
            <View className="bg-[#D9D9D9] rounded-xl">
                <TouchableOpacity style={{backgroundColor: selectedTab == 0 ? '#FFDF64' : '#D9D9D9'}} className=" rounded-2xl p-1.5"
                onPress={() => {handlePress(0)
                }}>
                    <Text > Bulan </Text>
                </TouchableOpacity>
                
            
            </View>
            <View className="bg-[#D9D9D9] rounded-xl">
            <TouchableOpacity style={{backgroundColor: selectedTab == 1 ? '#FFDF64' : '#D9D9D9'}} className="bg-[#D9D9D9] rounded-2xl p-1.5"
            onPress={() => {handlePress(1)}}>
                    <Text>Tahun</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View className="w-full">
      <LineChart
        data={{
          labels: ['2000', '2001', '2002', '2003', '2004'],
          datasets: [
            {
              data: [
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
        width={350} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=" Kg"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#FBFBFB',
          backgroundGradientFrom: '#FBFBFB',
          backgroundGradientTo: '#FBFBFB',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `#212121`,
          labelColor: (opacity = 1) => `#212121`,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#212121',
          },
        }}
        false
        style={{
          marginVertical: 8,
          borderRadius: 0,
        }}
      />
    </View>

        </View>
        )
    }
};

export default SwitchButton 