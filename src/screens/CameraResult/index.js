import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Button, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Dropdowns from "../../components/Dropdown";
import axiosInstance from "../../utils/axios";
import { useUser } from "../../contexts/UserContext";

const CameraResult = ({ route }) => {
  const { uri } = route.params;
  console.log(route.params);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [farms, setFarms] = useState([]);
  const [cattle, setCattle] = useState([]);
  const [cattleStats, setCattleStats] = useState([]);
  const { userData } = useUser();

  const parsedUserData = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const userId = parsedUserData.id;

    // console.log(userId);
    const fetchCattle = async () => {
      try {
        const farmsRequest = axiosInstance.get(`/users/${userId}/farms`);

        const cattleRequest = farmsRequest.then((response) => {
          const farmId = response.data.data[0].id;
          return axiosInstance.get(`/farms/${farmId}/cattle`);
        });

        const [farmsResponse, cattleResponse] = await Promise.all([
          farmsRequest,
          cattleRequest,
        ]);

        // console.log(cattleResponse.data);
        setFarms(farmsResponse.data.data);
        setCattle(cattleResponse.data.data);
      } catch (error) {
        console.error("Failed to fetch cattle:", error);
      }
    };

    fetchCattle();
  }, []);

  const handleDropdownChange = async (cattleId) => {
    setSelectedOption(cattleId);
    // console.log(cattleId);

    try {
      const statsResponse = await axiosInstance.get(
        `/cattle/${cattleId.value}/stats`
      );
      setCattleStats(statsResponse.data.data);
    } catch (error) {
      console.error("Failed to fetch cattle stats: ", error);
    }
  };

  const dropdownOptions = cattle.map((cattle) => ({
    label: cattle.name,
    value: cattle.id.toString(),
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
      {cattleStats.length > 0 &&
        cattleStats.map((stat, index) => (
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
    marginVertical: 10,
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
