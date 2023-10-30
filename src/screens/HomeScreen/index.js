import React, { useState, useLayoutEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/Header";
import SearchBar from '../../components/SearchBar';
import CardSapiTotal from '../../components/CardSapiTotal';
import CardSapiGender from '../../components/CardSapiGender';
import CardSapiCond from "../../components/CardSapiCond";
import OverviewChart from "../../components/OverviewChart";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  

  const handleSearch = (text) => {
    setSearchText(text);
  };


// 
    return(
        <View className="h-full">
            <CustomHeader title='Home' showUserData={true} />
            <View className="flex flex-row justify-between m-3">
              <View className="pt-3">
                <Text className="font-bold text-lg">Overview</Text>
              </View>
              <SearchBar 
                  placeholder="Pencarian"
                  value={searchText}
                  onChangeText={handleSearch}
              />
            </View>
            <ScrollView vertical={true} className="">
            <View className="mx-5 my-5 flex flex-row">
              <View className="flex justify-center">
                <CardSapiTotal></CardSapiTotal>
              </View>
              <View className="">
                <CardSapiGender
                  icon="gender-male"
                  title="Sapi Jantan"
                  jumlahsapi="60"
                  text="ekor"></CardSapiGender>
                <CardSapiGender
                  icon="gender-female"
                  title="Sapi Betina"
                  jumlahsapi="25"
                  text="ekor"></CardSapiGender>
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
