import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../../components/Header";
import SearchBar from "../../components/SearchBar";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

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
    </View>
  );
};

export default HomeScreen;
