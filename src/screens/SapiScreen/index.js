import React from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from "react-native";
import CustomHeader from "../../components/Header";
import Kartu from "../../components/Kartu";

const SapiScreen = () => {
  return (
    <View className="h-full">
      <CustomHeader title="Sapi" showUserData={false} />
      <ScrollView horizontal={false}>
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
