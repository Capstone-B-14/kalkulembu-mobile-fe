import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../../components/SearchBar";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SearchBar
        placeholder='Pencarian'
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default HomeScreen;
