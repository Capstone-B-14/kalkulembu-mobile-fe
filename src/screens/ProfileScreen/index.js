import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
  Modal,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AuthModal from "../../components/Modal/AuthModal";
import CustomButton from "../../components/Button";
import CustomHeader from "../../components/Header";
import { useUser } from "../../contexts/UserContext";
import axiosInstance from "../../utils/axios";
import { parse } from "react-native-svg";

const ProfileScreen = () => {
  const { userData, isAuthenticated, clearUserTokenAuth } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmLogout, setconfirmLogout] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  const inputAnimation = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const toggleEditing = () => {
    if (!isEditing) setShowInputs(true);

    setIsEditing(!isEditing);
    Animated.timing(inputAnimation, {
      toValue: !isEditing ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      if (isEditing) setShowInputs(false);
    });
  };

  const inputHeight = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 450], // Adjust this value to the sum height of your TextInputs
  });

  const inputOpacity = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleLogin = () => {
    navigation.navigate("Login");
    setModalVisible(false);
  };

  const handleBack = () => {
    navigation.goBack();
    setModalVisible(false);
  };

  const showLogoutConfirmation = () => {
    setconfirmLogout(true);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setconfirmLogout(false);
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
    <Pressable className='flex-1'>
      <CustomHeader
        title='Profil'
        rightComponent={
          <TouchableOpacity onPress={showLogoutConfirmation}>
            <Text>Keluar</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{ uri: parsedUserData.photo }}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>{parsedUserData?.name}</Text>
            <Text style={styles.bio}>{parsedUserData?.role}</Text>
            <AuthModal
              isVisible={modalVisible}
              onLogin={handleLogin}
              onGoBack={handleBack}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.button,
                isEditing ? styles.buttonSave : styles.buttonEdit,
              ]}
              onPress={toggleEditing}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "Save Profile" : "Edit Profile"}
              </Text>
            </Pressable>
          </View>

          <Pressable
            className='flex-1'
            onPress={() => {
              setIsEditing(true);
              console.log(isEditing);
            }}
            onPressOut={(e) => e.stopPropagation()}
          >
            <Animated.View
              style={{
                height: inputHeight,
                opacity: inputOpacity,
                overflow: "hidden",
              }}
            >
              {showInputs && (
                <View className='m-5 '>
                  <View style={styles.inputcontainer}>
                    <Text style={styles.label}>Nama</Text>
                    <TextInput
                      placeholder='Nama'
                      style={styles.input}
                      editable={isEditing}
                    />
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      placeholder='Email'
                      style={styles.input}
                      editable={isEditing}
                    />
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text style={styles.label}>Nomor Telepon</Text>
                    <TextInput
                      placeholder='Nomor Telepon'
                      style={styles.input}
                      editable={isEditing}
                    />
                  </View>

                  <TouchableOpacity className='items-center p-4 bg-[#FFDF64] mt-10 ml-24 mr-24 rounded-2xl'>
                    <Text className='font-bold text-[18px]'>Simpan</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Animated.View>
          </Pressable>
        </View>
      </ScrollView>
      <Modal animationType='slide' transparent={true} visible={confirmLogout}>
        <View className='flex-1 items-center justify-center'>
          <View className='w-[300px] h-[200px] bg-white rounded-2xl'>
            <Text className='text-[18px] text-center pt-8'>
              Apakah Anda yakin ingin keluar?
            </Text>
            <View className='flex flex-row justify-center pt-8'>
              <TouchableOpacity
                className='bg-[#FFDF64] w-[100px] h-[40px] rounded-2xl items-center justify-center mr-4'
                onPress={handleConfirmLogout}
              >
                <Text className='text-[18px]'>Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className='bg-[#FFDF64] w-[100px] h-[40px] rounded-2xl items-center justify-center'
                onPress={() => {
                  setconfirmLogout(false);
                }}
              >
                <Text className='text-[18px]'>Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Pressable>
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
  buttonContainer: {
    alignSelf: "flex-end",
    marginRight: 16,
    marginTop: 16,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFDF64",
    padding: 16,
    borderRadius: 16,
  },
  buttonEdit: {
    backgroundColor: "#FFDF64", // color when in edit mode
  },
  buttonSave: {
    backgroundColor: "#4CAF50", // color when in save mode
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    // Rest of your styles...
  },
  inputcontainer: {
    backgroundColor: "#FBFBFB",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingTop: 16,
  },
  label: {
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  input: {
    fontSize: 16,
    padding: 16,
    // Increase the height if needed to make it easier to tap
    minHeight: 44, // 44 pixels is a good minimum touch target size
  },
});

export default ProfileScreen;
