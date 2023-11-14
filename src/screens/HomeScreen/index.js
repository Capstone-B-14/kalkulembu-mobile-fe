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

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchCattleData = async () => {
      try {
        const response = await axiosInstance.get(
          `/farms/${currentFarm}/cattle`
        );
        setCattleData(response.data);
      } catch (error) {
        console.error("Error fetching cattle data:", error.request);
      }
    };

    fetchCattleData();
    console.log(cattleData);
  }, [currentFarm]);

  return (
    <View className='h-full sm: w-auto'>
      <CustomHeader title='Home' showUserData={true} />
      {isAuthenticated && userData ? <FarmSwitcher /> : null}
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
              jumlahsapi='60'
              text='ekor'
            ></CardSapiGender>
            <CardSapiGender
              icon='gender-female'
              title='Sapi Betina'
              jumlahsapi='25'
              text='ekor'
            ></CardSapiGender>
          </View>
        </View>
        <View>
          <CardSapiCond></CardSapiCond>
        </View>
        <View>
          <OverviewChart></OverviewChart>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
