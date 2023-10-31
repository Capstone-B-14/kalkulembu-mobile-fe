import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Dropdowns from "../../components/Dropdown";
import axiosInstance from "../../utils/axios";
import { useUser } from "../../contexts/UserContext";

const CameraResult = ({ route }) => {
  const { uri } = route.params;
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [farms, setFarms] = useState([]);
  const [cows, setCows] = useState([]);
  const [cowStats, setCowStats] = useState([]);
  const { userData } = useUser();

  const parsedUserData = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const userId = parsedUserData.id;

    // console.log(userId);
    const fetchCows = async () => {
      try {
        const farmsRequest = axiosInstance.get(`/users/${userId}/farms`);

        const cowsRequest = farmsRequest.then((response) => {
          const farmId = response.data.data[0].id;
          return axiosInstance.get(`/farms/${farmId}/cows`);
        });

        const [farmsResponse, cowsResponse] = await Promise.all([
          farmsRequest,
          cowsRequest,
        ]);

        // console.log(cowsResponse.data);
        setFarms(farmsResponse.data.data);
        setCows(cowsResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch cows:", error);
      }
    };

    fetchCows();
  }, []);

  const handleDropdownChange = async (cowId) => {
    setSelectedOption(cowId);
    // console.log(cowId);

    try {
      const statsResponse = await axiosInstance.get(
        `/cows/${cowId.value}/stats`
      );
      setCowStats(statsResponse.data.data);
    } catch (error) {
      console.error("Failed to fetch cow stats: ", error);
    }
  };

  const dropdownOptions = cows.map((cow) => ({
    label: cow.name,
    value: cow.id.toString(),
  }));

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <Dropdowns
        options={dropdownOptions}
        selectedValue={selectedOption}
        onSelect={handleDropdownChange}
        placeholder='Pilih Sapi'
        search
        searchPlaceholder='Pilih Sapi'
      />
      {cowStats.length > 0 &&
        cowStats.map((stat, index) => (
          <View key={index} style={styles.statContainer}>
            <View style={styles.statDetails}>
              <Text>Usia: {stat.age} bulan</Text>
              <Text>Bobot: {stat.weight} kg</Text>
              <Text>{stat.healthy ? "Sehat" : "Sakit"}</Text>
            </View>
            <Text style={styles.statDate}>
              {new Date(stat.measuredAt).toLocaleDateString("id-ID")}{" "}
              {new Date(stat.measuredAt).toLocaleTimeString("id-ID")}
            </Text>
          </View>
        ))}
      <Button title='Go Back' onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  image: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
  },
  statDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  statDate: {
    marginLeft: 20,
  },
});

export default CameraResult;
