import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";
import CustomButton from "../Button";

const statusBarHeight = Constants.statusBarHeight;

const CustomHeader = ({ title, showUserData, rightComponent }) => {
  const { userData, clearUserTokenAuth } = useUser();
  const navigation = useNavigation();
  const parsedUserData = userData ? JSON.parse(userData) : null;

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // useEffect(() => {
  //   if (!parsedUserData) {
  //     clearUserTokenAuth();
  //   }
  // }, [userData]);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' animated={true} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContent}>
        {showUserData && parsedUserData ? (
          <Text style={styles.userData}>
            Selamat datang, {parsedUserData?.name.split(' ')[0]}
          </Text>
        ) : showUserData ? (
          <CustomButton
            style={styles.login}
            onPress={handleLogin}
            text='Masuk'
            backgroundColor='#FFDF64'
          />
        ) : null}
        {rightComponent && rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    paddingTop: statusBarHeight + 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  login: {
    flex: 0,
    borderRadius: 10,
  },
  userData: {
    fontSize: 18,
    fontWeight: "regular",
    color: "black",
    textAlign: "left",
  },
  rightContent: {
    flex: 0,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default CustomHeader;