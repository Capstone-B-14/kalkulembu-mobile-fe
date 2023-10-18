import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import CustomHeader from "../../components/Header";
import SearchBar from "../../components/SearchBar";

const HomeScreen = (navigation) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View>
      <CustomHeader title='Home' />
      <SearchBar
        placeholder='Pencarian'
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default HomeScreen;
