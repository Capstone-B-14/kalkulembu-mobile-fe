import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const SapiCard = (props) => {
  const getStatus = () => {
    if (props.status == 0) {
      return "Sakit";
    } else if (props.status == 1) {
      return "Sehat";
    } else {
      return "Unknown";
    }
  };
  return (
    <ScrollView
      className=" grid-cols-2 scroll-auto p-2 gap-0.5 left-1"
    >
      <View className="right-[4px]">
          <View className="justify-between rounded-md bg-white p-[10px] mb-1 shadow-gray-300 ring-offset-2 shadow-opacity-20 shadow-radius-6 w-full h-full">
              {props.image && (
                <Image
                  source={props.image}
                  style={styles.cardImage}
                  className="w-full h-[150px] rounded-[5px]"
                />
              )}
              {props.namasapi && (
                <Text style={styles.namaSapi}>{props.namasapi}</Text>
              )}
              {props.bobot && <Text style={styles.bobot}>{props.bobot}kg</Text>}
              {props.status !== undefined && (
                <Text style={styles.status}>
                  {props.status == 0 ? "Sakit" : "Sehat"}
                </Text>
              )}
          </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 5,
  },
  namaSapi: {
    paddingTop: 3,
    fontSize: 18,
    fontWeight: "bold",
  },
  bobot: {
    fontSize: 14,
  },
  status: {
    fontSize: 12,
  },
});

export default SapiCard;
