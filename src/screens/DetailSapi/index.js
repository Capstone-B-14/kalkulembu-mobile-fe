import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import axiosInstance from "../../utils/axios";
import Camera from "../../components/Camera";
import { ScrollView } from "react-native";
import Detail1 from "../../components/Detail1";
import Detail2 from "../../components/Detail2";
import Detail3 from "../../components/Detail3";
import Card from "../../components/Card";

const DetailSapi = ({ route, navigation }) => {
  const { cattleId, farmId } = route.params;
  // console.log(route.params);

  const [cattleData, setCattleData] = useState({});
  const [weightAvg, setWeightAvg] = useState([]);

  useEffect(() => {
    const getData = async (farm_id, cattle_id) => {
      try {
        const response = await axiosInstance.get(
          `/farms/${farm_id}/cattle/${cattle_id}/latest`
        );
        if (response.status === 200) {
          setCattleData(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData(farmId, cattleId);
  }, []);

  useEffect(() => {
    const getAverages = async (cattle_id) => {
      try {
        const response = await axiosInstance.get(
          `/cattle/${cattle_id}/stats/weight`
        );
        if (response.status === 200) {
          setWeightAvg(response.data.data);
          // console.log(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching cattle data:", error);
        Alert.alert("Error", "Failed to fetch cattle stats.");
      }
    };

    getAverages(cattleId);
  }, []);

  const getSexLabel = () => {
    if (cattleData[0]?.sex) {
      return "Jantan";
    } else {
      return "Betina";
    }
  };

  const getHealthyLabel = () => {
    if (cattleData[0]?.latestStats.healthy) {
      return "Sehat";
    } else {
      return "Sakit";
    }
  };

  return (
    <View className='h-full'>
      <ScrollView>
        <Detail1
          name={cattleData[0]?.name}
          sex={getSexLabel()}
          healthy={getHealthyLabel()}
        />
        <Detail2
          age={cattleData[0]?.latestStats.age}
          weight={cattleData[0]?.latestStats.weight}
        />
        <Detail3 averages={weightAvg} />
        <ScrollView horizontal={true} className='flex flex-row p-3 '>
          <Card
            weight={cattleData[0]?.latestStats.weight}
            measureDate={cattleData[0]?.latestStats.measuredAt.split("T")[0]}
          />
        </ScrollView>
      </ScrollView>
      <Camera />
    </View>
  );
};

const styles = StyleSheet.create({
  dua: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginEnd: 40,
    marginStart: 40,
  },
  umur: {
    backgroundColor: "#FBFBFB",
    flexDirection: "row",
    borderRadius: 15,
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
  },
  subumur: {
    padding: 10,
  },
  textumur: {
    fontWeight: "bold",
  },
  bulan: {
    backgroundColor: "black",
    flexDirection: "row",
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    padding: 5,
  },
  angka: {
    color: "white",
    fontSize: 35,
    alignSelf: "center",
  },
  satuan: {
    color: "white",
    alignSelf: "center",
  },
});

export default DetailSapi;
