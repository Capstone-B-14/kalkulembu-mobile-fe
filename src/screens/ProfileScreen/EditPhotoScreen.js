import React, { useState, useContext } from "react";
import { View, Button, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";

import axiosInstance from "../../utils/axios";

async function getPermissions() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const { status } = await MediaLibrary.getPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
    return false;
  }
  return true;
}

const EditPhotoScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append('photo', {
        uri: selectedImage,
        type: 'image/jpeg',
      });

      try {
        const response = await axiosInstance.put('/auth/updateprofile', formData, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        });
        if (response.status == 200) {
          setSelectedImage(response.data.data.photo);
          setLoading(false);
          navigation.goBack();
        } else {
          console.error("Gagal upload foto: ", response.data.error);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {selectedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          <Button title="Upload Image" onPress={uploadImage} disabled={loading} />
          {loading && <ActivityIndicator size="large" />}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default EditPhotoScreen;