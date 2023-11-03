import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
  Modal,
  Button,
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

const ProfileScreen = () => {
  const { userData, isAuthenticated, clearUserTokenAuth } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmLogout, setconfirmLogout] = useState(false);

  const navigation = useNavigation();

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

  const handleEdit = () => {
    setIsEditing(false);
    console.log(isEditing);
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
    <Pressable
      className='flex-1'
      onPress={() => {
        setIsEditing(false);
      }}
    >
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
            <Pressable
              className='items-center p-4 bg-[#FFDF64] mt-10 ml-24 mr-24 rounded-2xl'
              onPress={() => {
                setIsEditing(true);
              }}
              onPressOut={(e) => e.stopPropagation()}
            >
              <Text className='font-bold text-[18px]'>Edit Profil</Text>
            </Pressable>
          </View>

          <Pressable className='flex-1'>
            <View className='m-5 '>
              <View className='bg-[#FBFBFB] rounded-t-2xl border-b-[1px] border-[#CCCCCC]'>
                <Text className='text-[16px] pl-4 pr-4 pt-4 pb-2'>Nama</Text>
                <TextInput
                  placeholder='Nama'
                  className='pl-4 pr-4 pt-2 pb-4'
                  editable={isEditing}
                ></TextInput>
              </View>
              <View className='bg-[#FBFBFB] border-b-[1px] border-[#CCCCCC]'>
                <Text className='text-[16px] pl-4 pr-4 pt-4 pb-2'>Email</Text>
                <TextInput
                  placeholder='Email'
                  className='pl-4 pr-4 pt-2 pb-4'
                  editable={isEditing}
                ></TextInput>
              </View>
              <View className='bg-[#FBFBFB] border-b-[1px] border-[#CCCCCC]'>
                <Text className='text-[16px] pl-4 pr-4 pt-4 pb-2'>
                  Nomor Telepon
                </Text>
                <TextInput
                  placeholder='Nomor Telepon'
                  className='pl-4 pr-4 pt-2 pb-4'
                  editable={isEditing}
                ></TextInput>
              </View>

              <TouchableOpacity className='items-center p-4 bg-[#FFDF64] mt-10 ml-24 mr-24 rounded-2xl'>
                <Text className='font-bold text-[18px]'>Simpan</Text>
              </TouchableOpacity>
            </View>
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
});

export default ProfileScreen;
