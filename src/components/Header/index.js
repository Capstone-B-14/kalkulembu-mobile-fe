import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

const statusBarHeight = Constants.statusBarHeight;

const CustomHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' animated='true' />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    padding: 18,
    paddingTop: statusBarHeight + 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  backButton: {
    marginRight: 10,
  },
});

export default CustomHeader;
