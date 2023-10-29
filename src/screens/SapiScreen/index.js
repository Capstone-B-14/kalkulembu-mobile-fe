import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import CustomHeader from "../../components/Header";
import SapiCard from "../../components/SapiCard";

const data = [
  {
    id: 1,
    namasapi: "Jono",
    bobot: "200",
    status: 1,
    image: require("../../../assets/sapi1.jpg"),
  },
  {
    id: 2,
    namasapi: "Joni",
    bobot: "300",
    status: 0,
    image: require("../../../assets/sapi2.jpg"),
  },
  {
    id: 3,
    namasapi: "Joni",
    bobot: "300",
    status: 0,
    image: require("../../../assets/sapi2.jpg"),
  },
  {
    id: 4,
    namasapi: "Joni",
    bobot: "300",
    status: 0,
    image: require("../../../assets/sapi2.jpg"),
  },
  {
    id: 5,
    namasapi: "Joni",
    bobot: "300",
    status: 0,
    image: require("../../../assets/sapi2.jpg"),
  },
  {
    id: 6,
    namasapi: "Joni",
    bobot: "300",
    status: 0,
    image: require("../../../assets/sapi2.jpg"),
  },
  {
    id: 7,
    namasapi: "Joni",
    bobot: "300",
    status: 0,
    image: require("../../../assets/sapi2.jpg"),
  },
  {
    id: 8,
    namasapi: "Joni",
    bobot: "300",
    status: 0,
    image: require("../../../assets/sapi3.jpg"),
  },
];

const SapiScreen = () => {
  return (
    <View>
      <CustomHeader title="Sapi" showUserData={false} />
      <View className="flex-wrap">
        <View className="justify-between w-full">
          <FlatList
            data={data}
            numColumns={2} // 2 columns per row
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SapiCard
                namasapi={item.namasapi}
                bobot={item.bobot}
                status={item.status}
                image={item.image}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};
export default SapiScreen;
