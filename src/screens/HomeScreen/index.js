
import React, { useState, useLayoutEffect } from "react";
import { View, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/Header";
import SearchBar from '../../components/SearchBar';
import CardSapiTotal from '../../components/CardSapiTotal';
import CardSapiGender from '../../components/CardSapiGender';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailSapi from "../DetailSapi";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const [searchText, setSearchText] = useState("");
  
  const handleSearch = (text) => {
    setSearchText(text);
  };

    return(
        <View>
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
            

        </View>
    );
};
export default HomeScreen;
