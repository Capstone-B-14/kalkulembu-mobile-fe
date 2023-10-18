import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";
import CustomButton from "../Button";

const statusBarHeight = Constants.statusBarHeight;

const CustomHeader = ({ title, showUserData }) => {
  const { userData } = useUser();
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' animated={true} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContent}>
        {userData ? (
          <Text style={styles.userData}>
            Selamat datang, {userData.username}
          </Text>
        ) : (
          <CustomButton
            style={styles.login}
            onPress={handleLogin}
            text='Masuk'
            backgroundColor='#FFDF64'
          />
        )}
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
    paddingTop: statusBarHeight + 6,
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
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  rightContent: {
    flex: 0,
    alignItems: "center",
  },
});

export default CustomHeader;