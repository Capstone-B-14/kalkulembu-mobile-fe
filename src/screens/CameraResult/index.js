import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Switch,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";

import Dropdowns from "../../components/Dropdown";
import axiosInstance from "../../utils/axios";
import { useUser } from "../../contexts/UserContext";
import CustomButton from "../../components/Button";

const statusBarHeight = Constants.statusBarHeight;

const CameraResult = ({ route }) => {
  const { uri, cowAge } = route.params;
  const navigation = useNavigation();

  // Specific stats states
  const [weight, setWeight] = useState(0);
  const [healthy, setHealthy] = useState(true);

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

  const submitStats = async () => {
    const payload = {
      age: Number(cowAge),
      weight: 696,
      healthy: healthy,
    };
    if (selectedOption) {
      try {
        const response = await axiosInstance.post(
          `/cattle/${selectedOption.value}/stats/${new Date().toISOString()}`,
          payload
        );
        if (response.status === 200) {
          console.log(response);
        }
      } catch (error) {
        console.error("Gagal submit stats sapi: ", error);
      }
    }
  };

  const dropdownOptions = cattle.map((cattle) => ({
    label: cattle.name,
    value: cattle.id.toString(),
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name='arrow-left' />
        <Text style={styles.back}>Kembali</Text>
      </TouchableOpacity>
      <Image source={{ uri }} style={styles.image} />
      <View style={styles.healthSwitch}>
        <Text>Apakah sapi sehat?</Text>
        <Switch onValueChange={setHealthy} value={healthy} />
      </View>
      <View style={styles.submitContainer}>
        <CustomButton style={styles.submit} text='Submit' onPress={() => submitStats()} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
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
        </View>
      </ScrollView>
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
    width: "75%",
    height: "60%",
    resizeMode: "contain",
    marginVertical: 20,
  },
  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    left: 50,
    marginTop: statusBarHeight + 25,
  },
  healthSwitch: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    left: 50,
  },
  submitContainer: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
  },
  submit: {
    width: "100%",
    flex: 0,
    borderRadius: 50,
    backgroundColor: "#FFDF64",
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
  back: {
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default CameraResult;
