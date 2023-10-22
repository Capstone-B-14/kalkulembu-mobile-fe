import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import CardSapiTotal from "../../components/CardSapiTotal";
import CardSapiGender from "../../components/CardSapiGender";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View>
      <CustomHeader title='Home' showUserData={true} />
      <SearchBar
        placeholder='Pencarian'
        value={searchText}
        onChangeText={handleSearch}
      />
      <CardSapiTotal></CardSapiTotal>
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
  );
};
export default HomeScreen;
