import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ChartMo = () => {
  return (
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
  );
};

export default ChartMo;
