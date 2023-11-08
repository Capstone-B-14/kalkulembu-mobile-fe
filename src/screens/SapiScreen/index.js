import React, {useState} from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import CustomHeader from "../../components/Header";
import SearchBar from '../../components/SearchBar';
import Kartu from "../../components/Kartu";

const SapiScreen = () => {
  const [searchText, setSearchText] = useState("");
  

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View className="h-full sm: w-auto">
      <CustomHeader title="Sapi" showUserData={false} />
      <View className="flex items-end mx-4">
        <SearchBar 
          placeholder="Cari Sapi"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView horizontal={false} className="my-4">
        <View className="">
          <View  className="flex flex-row flex-wrap h-full w-full items-center justify-between">
            <Kartu
            photo="https://reactjs.org/logo-og.png"
            name="Joni"
            weight="70"
            kondisi="sakit" />
            <Kartu
            photo="https://reactjs.org/logo-og.png"
            name="YesPapa"
            weight="70"
            kondisi="sehat" />
            <Kartu
            photo="https://reactjs.org/logo-og.png"
            name="Joni"
            weight="70"
            kondisi="sakit" />
            <Kartu
            photo="https://reactjs.org/logo-og.png"
            name="YesPapa"
            weight="70"
            kondisi="sehat" />
            <Kartu
            photo="https://reactjs.org/logo-og.png"
            name="Joni"
            weight="70"
            kondisi="sakit" />
         </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SapiScreen;
