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
  Button,
  Animated,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import AuthModal from "../../components/Modal/AuthModal";
import CustomButton from "../../components/Button";
import CustomHeader from "../../components/Header";
import { useUser } from "../../contexts/UserContext";
import axiosInstance from "../../utils/axios";


const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [touchedFields, setTouchedFields] = useState({});

  const setValue = (field, value) => {
    if (values[field] === value) return;
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
  };

  // Function to get only changed values
  const getChangedValues = () => {
    return Object.keys(touchedFields).reduce((acc, field) => {
      if (touchedFields[field] && initialValues[field] !== values[field]) {
        acc[field] = values[field];
      }
      return acc;
    }, {});
  };

  return [values, setValue, getChangedValues];
};

const ProfileScreen = () => {
  const { userData, setUserProfileData, isAuthenticated, clearUserTokenAuth } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmLogout, setconfirmLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  const [form, setFormValue, getChangedValues] = useForm({
    name: '',
    phone: '',
  });

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

  const handleSubmit = async () => {
    const changedValues = getChangedValues();

    if (Object.keys(changedValues).length > 0) {
      await sendFormData(changedValues);
    }
  };

  const sendFormData = async (changedValues) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put("/auth/updateprofile", changedValues);

      if (response.status == 200) {
        await fetchUserData();
      } else {
        console.error("Gagal edit profil: ", response.data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Terjadi error: ", error);
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      console.log("Fetching user data...");
      const response = await axiosInstance.post("/auth/profile");

      if (response.status == 200) {
        setUserProfileData(response.data.data.user);
      } else {
        console.error("What is profile data? ", response.data.error);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("/auth/logout");

      if (response.data.success) {
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
            <Button
              title="Edit Photo"
              onPress={() => navigation.navigate('EditPhotoScreen')}
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
                Edit Profile
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
                      onChangeText={(text) => setFormValue('name', text)}
                      value={form.name}
                      editable={isEditing}
                    />
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text style={styles.label}>Nomor Telepon</Text>
                    <TextInput
                      placeholder='Nomor Telepon'
                      style={styles.input}
                      onChangeText={(text) => setFormValue('phone', text)}
                      value={form.phone}
                      editable={isEditing}
                    />
                  </View>
                  <CustomButton
                    style={styles.buttonSend}
                    text='Simpan'
                    backgroundColor='#FFDF64'
                    textColor='#000'
                    onPress={handleSubmit}
                  />
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
  buttonSend: {
    alignSelf: "center",
    marginTop: 10,
    width: "90%",
    flex: 0,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
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
    minHeight: 44,
  },
});

export default ProfileScreen;
