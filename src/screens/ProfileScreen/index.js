import React, { useState, useCallback } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AuthModal from "../../components/Modal/AuthModal";
import CustomHeader from "../../components/Header";
import { useUser } from "../../contexts/UserContext";
// import { REACT_APP_API_URL } from "@env";

const ProfileScreen = () => {
  const { userData, isAuthenticated } = useUser();
  const [profileData, setProfileData] = useState('');
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
  useFocusEffect(
    useCallback(() => {
      // console.log("useFocusEffect callback is running");

      if (!isAuthenticated && !userData) {
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
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.bio}>{userData.role}</Text>
        <AuthModal
          isVisible={modalVisible}
          onLogin={handleLogin}
          onGoBack={handleBack}
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
});

export default ProfileScreen;
