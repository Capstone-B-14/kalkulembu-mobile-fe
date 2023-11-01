import React, { useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AuthModal from "../../components/Modal/AuthModal";
import CustomButton from "../../components/Button";
import CustomHeader from "../../components/Header";
import { useUser } from "../../contexts/UserContext";
import axiosInstance from "../../utils/axios";

const ProfileScreen = () => {
  const { userData, isAuthenticated, clearUserTokenAuth } = useUser();
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
    setModalVisible(false);
  };

  const handleBack = () => {
    navigation.goBack();
    setModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");

      if (response.data.success) {
        // Clear local state and SecureStore
        clearUserTokenAuth();

        navigation.navigate("Home");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const parsedUserData = userData ? JSON.parse(userData) : null;

  useFocusEffect(
    useCallback(() => {
      // console.log("useFocusEffect callback is running");

      if (!isAuthenticated && !parsedUserData) {
        setModalVisible(true);
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <CustomHeader title='Profil' />

      <View style={styles.header}>
        <Image
          uri // Replace with your image source
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{parsedUserData?.name}</Text>
        <Text style={styles.bio}>{parsedUserData?.role}</Text>
        <AuthModal
          isVisible={modalVisible}
          onLogin={handleLogin}
          onGoBack={handleBack}
        />
        <CustomButton
          style={styles.logout}
          onPress={handleLogout}
          text='Log Out'
          backgroundColor='#FFDF64'
        />
      </View>
      {/* Add more content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  bio: {
    fontSize: 16,
  },
  logout: {
    flex: 0,
    borderRadius: 10,
  },
});

export default ProfileScreen;
