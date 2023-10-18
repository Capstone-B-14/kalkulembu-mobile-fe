import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import CustomHeader from "../../components/Header";
import { useUser } from "../../contexts/UserContext";
// import { REACT_APP_API_URL } from "@env";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { setUserData } = useUser();
  const [loading, setLoading] = useState(true);

  const apiURL = process.env.REACT_APP_API_URL + "/auth/profile";
  console.log("URL: ", apiURL);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/auth/profile"
        );
        const { password, ...filteredData } = response.data.data;
        setUserData(filteredData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data: ", err);
        setLoading(false);
      }
    };

    fetchUserData();
  });

  return (
    <View style={styles.container}>
      <CustomHeader title='Profil' />
      <View style={styles.header}>
        <Image
          source // Replace with your image source
          style={styles.profileImage}
        />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.bio}>Front-end Developer</Text>
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
