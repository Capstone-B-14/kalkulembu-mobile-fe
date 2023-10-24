import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../contexts/UserContext";
import CustomButton from "../Button";
import axios from "axios";

const statusBarHeight = Constants.statusBarHeight;

const CustomHeader = ({ title, showUserData }) => {
  const { userData, setUserData } = useUser();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const apiURL = process.env.REACT_APP_API_URL + "/auth/profile";
        const response = await axios.post(apiURL);
        console.log("userData", response.data);

        setUserData(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' animated={true} />
      <Text style={styles.title}>{title}</Text>
      {showUserData && (
        <View style={styles.rightContent}>
          {userData ? (
            <Text style={styles.userData}>Selamat datang, {userData.name}</Text>
          ) : (
            <CustomButton
              style={styles.login}
              onPress={handleLogin}
              text='Masuk'
              backgroundColor='#FFDF64'
            />
          )}
        </View>
      )}
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
