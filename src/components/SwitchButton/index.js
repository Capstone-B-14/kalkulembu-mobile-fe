import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const SwitchButton = ({ monthData, yearData }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  // useEffect(() => {
  //   let newLabels = [];
  //   let newData = [];

  //   if (selectedTab === 0 && monthData) {
  //     Object.entries(monthData).forEach(([key, value]) => {
  //       const [month, year] = key.split("-");
  //       newLabels.push(`${getMonthName(parseInt(Number(month)))} ${year}`);
  //       newData.push(value);
  //     });
  //   } else if (selectedTab === 1 && yearData) {
  //     Object.entries(yearData).forEach(([key, value]) => {
  //       newLabels.push(key);
  //       newData.push(value);
  //     });
  //   }

  //   setChartData({ labels: newLabels, datasets: [{ data: newData }] });
  // }, [selectedTab, monthData, yearData]);

  const handlePress = (value) => {
    setSelectedTab(value);
    // Reset chart data when tab changes
    setChartData({ labels: [], datasets: [{ data: [] }] });
  };

  // Function to convert month number to month name
  function getMonthName(monthNumber) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[monthNumber - 1]; // -1 because array indexes start at 0
  }

  // Only if monthData exists
  if (!monthData) {
    return null;
  } else if (!yearData) {
    return null;
  } else if (selectedTab === 0) {
    Object.entries(monthData).forEach(([key, value]) => {
      const [month, year] = key.split("-");
      chartData.labels.push(`${getMonthName(parseInt(month))} ${year}`);
      chartData.datasets[0].data.push(value);
    });
  } else if (selectedTab === 1) {
    Object.entries(yearData).forEach(([key, value]) => {
      chartData.labels.push(key);
      chartData.datasets[0].data.push(value);
    });
  }

  console.log(chartData);

  return (
    <View>
      {/* Tab Buttons */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 0 ? styles.activeTab : {}]}
          onPress={() => handlePress(0)}
        >
          <Text>Bulan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 1 ? styles.activeTab : {}]}
          onPress={() => handlePress(1)}
        >
          <Text>Tahun</Text>
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={350} // from react-native
          height={220}
          yAxisLabel=''
          yAxisSuffix=' kg'
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#FBFBFB",
            backgroundGradientFrom: "#FBFBFB",
            backgroundGradientTo: "#FBFBFB",
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `#212121`,
            labelColor: (opacity = 1) => `#212121`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#212121",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    margin: 10,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: "#FFDF64",
  },
  chartContainer: {
    alignItems: "center",
  },
});

export default SwitchButton;
