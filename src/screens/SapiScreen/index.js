import React from "react";
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from "react-native";
import CustomHeader from "../../components/Header";
import SapiCard from "../../components/SapiCard";

const SapiScreen = () => {
  return (
    <View>
      <CustomHeader title="Sapi" showUserData={false} />
      <View>
        <SapiCard
        image="https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2022/07/15/3905737094.jpg"
        name="Johnny"
        weight="70"
        condition="sehat">

        </SapiCard>
      </View>
    </View>
  );
};
export default SapiScreen;
