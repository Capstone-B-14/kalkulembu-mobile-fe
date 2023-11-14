import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axiosInstance from "../../utils/axios";
import CustomHeader from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import CardSapiTotal from "../../components/CardSapiTotal";
import CardSapiGender from "../../components/CardSapiGender";
import CardSapiCond from "../../components/CardSapiCond";
import OverviewChart from "../../components/OverviewChart";
import FarmSwitcher from "../../components/FarmSwitcher";
import { useUser } from "../../contexts/UserContext";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const { userData, isAuthenticated, currentFarm } = useUser();
  const [cattleData, setCattleData] = useState("");
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [healthyCattle, setHealthyCattle] = useState(0);
  const [sickCattle, setSickCattle] = useState(0);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchCattleData = async () => {
      try {
        const response = await axiosInstance.get(
          `/farms/${currentFarm}/cattle/latest`
        );
        setCattleData(response.data);
      } catch (error) {
        console.error("Error fetching cattle data:", error.request);
      }
    };

    if (currentFarm) {
      fetchCattleData();
    }
  }, [currentFarm]);

  useEffect(() => {
    if (cattleData && cattleData.data) {
      countCattle(cattleData.data);
    }
  }, [cattleData]);


  const countCattle = (cattleArray) => {
    let males = 0;
    let females = 0;
    let healthy = 0;
    let sick = 0;

    cattleArray.forEach((cattle) => {
      if (cattle.sex) {
        males++;
      } else {
        females++;
      }

      if (cattle.latestStats?.healthy) {
        healthy++;
      } else {
        sick++;
      }
    });

    // Update the state once after all calculations are done
    setMaleCount(males);
    setFemaleCount(females);
    setHealthyCattle(healthy);
    setSickCattle(sick);
  };


  return (
    <View className='h-full sm: w-auto'>
      <CustomHeader title='Home' showUserData={true} />
      <FarmSwitcher />
      <View className='flex flex-row justify-between m-3'>
        <View className='pt-3'>
          <Text className='font-bold text-lg'>Overview</Text>
        </View>
        <SearchBar
          placeholder='Pencarian'
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView vertical={true} className=''>
        <View className='mx-5 my-5 flex flex-row'>
          <View className='flex justify-center'>
            <CardSapiTotal count={cattleData.count}></CardSapiTotal>
          </View>
          <View className=''>
            <CardSapiGender
              icon='gender-male'
              title='Sapi Jantan'
              amount={maleCount}
              text='ekor'
            ></CardSapiGender>
            <CardSapiGender
              icon='gender-female'
              title='Sapi Betina'
              amount={femaleCount}
              text='ekor'
            ></CardSapiGender>
          </View>
        </View>
        <View>
          <CardSapiCond healthy={healthyCattle} sick={sickCattle}></CardSapiCond>
        </View>
        <View>
          <OverviewChart></OverviewChart>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
