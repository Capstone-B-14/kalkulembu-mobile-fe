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
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Button from "../../components/CustomButton";
import CustomHeader from "../../components/Header";
import { useUser } from "../../contexts/UserContext";
import axiosInstance from "../../utils/axios";
import useForm from "../../utils/useForm";

const ProfileScreen = () => {
  const { userData, setUserProfileData, isAuthenticated, clearUserTokenAuth } =
    useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmLogout, setconfirmLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showInputs, setShowInputs] = useState(false);

  const [form, setFormValue, getChangedValues] = useForm({
    name: "",
    phone: "",
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
      const response = await axiosInstance.put(
        "/auth/updateprofile",
        changedValues
      );

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
    <Pressable style={styles.flexOne}>
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
          <View style={styles.profileHeader}>
            <View style={styles.photoEditContainer}>
              <Image
                source={{ uri: parsedUserData?.photo }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => navigation.navigate("Edit Photo")}
              >
                <FontAwesome name='pencil' size={20} color='#FFF' />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{parsedUserData?.name}</Text>
              <Text style={styles.profileData}>{parsedUserData?.role}</Text>
              <Text style={styles.profileData}>{parsedUserData?.phone}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={[isEditing ? styles.buttonSave : styles.buttonEdit]}
              text='Edit Profil'
              backgroundColor={isEditing ? "#2E78A6" : "#FFDF64"}
              textColor={isEditing ? "#FBFBFB" : "#0D0D0D"}
              onPress={toggleEditing}
            />
          </View>
          <View>
            <Pressable
              className='flex-1'
              onPress={() => {
                setIsEditing(true);
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
                  <>
                    <View style={styles.inputContainer}>
                      <View style={styles.inputBox}>
                        <Text style={styles.label}>Nama</Text>
                        <TextInput
                          placeholder='Nama'
                          style={styles.input}
                          onChangeText={(text) => setFormValue("name", text)}
                          value={form.name}
                          editable={isEditing}
                        />
                      </View>
                      <View style={styles.inputBox}>
                        <Text style={styles.label}>Nomor Telepon</Text>
                        <TextInput
                          placeholder='Nomor Telepon'
                          style={styles.input}
                          onChangeText={(text) => setFormValue("phone", text)}
                          value={form.phone}
                          editable={isEditing}
                        />
                      </View>
                    </View>
                    <View style={styles.sendContainer}>
                      <Button
                        style={styles.buttonSend}
                        text='Simpan'
                        backgroundColor='#FFDF64'
                        textColor='#000'
                        onPress={handleSubmit}
                      />
                    </View>
                  </>
                )}
              </Animated.View>
            </Pressable>
          </View>
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
  flexOne: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  photoEditContainer: {
    position: "relative",
    marginRight: 20, // Adjust spacing according to your design
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#FFDF64",
    borderRadius: 50,
    padding: 8,
  },
  profileInfo: {
    justifyContent: "center",
    flex: 1,
  },
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
    fontFamily: "Roboto-Regular",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  profileData: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  logout: {
    flex: 0,
    borderRadius: 20,
  },
  buttonContainer: {
    alignSelf: "flex-end",
    width: "60%",
    marginTop: 20,
    marginHorizontal: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFDF64",
    padding: 16,
    borderRadius: 20,
  },
  buttonEdit: {
    backgroundColor: "#FFDF64", // color when in edit mode
  },
  buttonSave: {
    backgroundColor: "#2E78A6", // color when in save mode
  },
  sendContainer: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
  },
  buttonSend: {
    width: "85%",
    borderRadius: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Roboto-Regular",
  },
  inputContainer: {
    marginHorizontal: 0,
    marginTop: 20,
    marginBottom: 10,
  },
  inputBox: {
    marginHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#FBFBFB",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingTop: 16,
  },
  label: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    padding: 16,
    minHeight: 44,
  },
});

export default ProfileScreen;
