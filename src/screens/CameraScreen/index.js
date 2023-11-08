import React, { useRef, useState, useEffect, useCallback } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import CowAgePicker from "../../components/CowAgePicker";
import Modal from "../../components/Modal";

const CameraScreen = () => {
  // Camera stuff
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);

  // Aspect ratio
  const [aspectRatio, setAspectRatio] = useState("4:3");

  // Modal and mounting
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [isScreenActive, setIsScreenActive] = useState(false);

  // Picker state
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);

  const handleFinalizeAgeSelection = () => {
    setIsPickerVisible(false); // Hide the picker after selecting the age
  };

  const handleAgeChange = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  const navigation = useNavigation();

  const cameraRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      setIsScreenActive(true);
      // console.log("useFocusEffect callback is running");

      return () => {
        setIsScreenActive(false);
      };
    }, [])
  );

  useEffect(() => {
    if (cameraRef.current && permission?.granted) {
      if (!isScreenActive) {
        cameraRef.current.pausePreview();
        cameraRef.current.stopRecording();
        // console.log("useFocusEffect blur");
      }
    }
  }, [isScreenActive, permission]);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  if (!isScreenActive) {
    return null;
  }
  const onClose = () => {
    setIsModalOpen(false);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);
      navigation.navigate("CameraResult", { uri: photo.uri });
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        ratio={aspectRatio}
      >
        <View className='m-4 flex justify-center items-center pt-10'></View>
        <Image
          source={require("../../../assets/sapi-outline.png")}
          style={styles.sticker}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Svg width='40' height='40' viewBox='0 0 40 40'>
              <Path
                d='M26.25 21.25C26.25 22.9076 25.5915 24.4973 24.4194 25.6694C23.2473 26.8415 21.6576 27.5 20 27.5C18.3424 27.5 16.7527 26.8415 15.5806 25.6694C14.4085 24.4973 13.75 22.9076 13.75 21.25C13.75 19.5924 14.4085 18.0027 15.5806 16.8306C16.7527 15.6585 18.3424 15 20 15C21.6576 15 23.2473 15.6585 24.4194 16.8306C25.5915 18.0027 26.25 19.5924 26.25 21.25Z'
                fill='white'
                transform='rotate(90 20 20)'
              />
              <Path
                d='M5 10C3.67392 10 2.40215 10.5268 1.46447 11.4645C0.526784 12.4021 0 13.6739 0 15L0 30C0 31.3261 0.526784 32.5979 1.46447 33.5355C2.40215 34.4732 3.67392 35 5 35H35C36.3261 35 37.5979 34.4732 38.5355 33.5355C39.4732 32.5979 40 31.3261 40 30V15C40 13.6739 39.4732 12.4021 38.5355 11.4645C37.5979 10.5268 36.3261 10 35 10H32.07C30.744 9.99972 29.4725 9.47275 28.535 8.535L26.465 6.465C25.5275 5.52725 24.256 5.00028 22.93 5H17.07C15.744 5.00028 14.4725 5.52725 13.535 6.465L11.465 8.535C10.5275 9.47275 9.25597 9.99972 7.93 10H5ZM6.25 15C5.91848 15 5.60054 14.8683 5.36612 14.6339C5.1317 14.3995 5 14.0815 5 13.75C5 13.4185 5.1317 13.1005 5.36612 12.8661C5.60054 12.6317 5.91848 12.5 6.25 12.5C6.58152 12.5 6.89946 12.6317 7.13388 12.8661C7.3683 13.1005 7.5 13.4185 7.5 13.75C7.5 14.0815 7.3683 14.3995 7.13388 14.6339C6.89946 14.8683 6.58152 15 6.25 15ZM28.75 21.25C28.75 23.5706 27.8281 25.7962 26.1872 27.4372C24.5462 29.0781 22.3206 30 20 30C17.6794 30 15.4538 29.0781 13.8128 27.4372C12.1719 25.7962 11.25 23.5706 11.25 21.25C11.25 18.9294 12.1719 16.7038 13.8128 15.0628C15.4538 13.4219 17.6794 12.5 20 12.5C22.3206 12.5 24.5462 13.4219 26.1872 15.0628C27.8281 16.7038 28.75 18.9294 28.75 21.25Z'
                fill='white'
                transform='rotate(90 20 20)'
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <Modal isOpen={isModalOpen} onClose={onClose}>
          <Image
            source={require("../../../assets/info-logo.png")}
            style={styles.logoinfo}
            resizeMode='contain'
          />
          <Text style={styles.modal}>
            Pastikan sapi yang akan difoto masuk ke dalam gambar outline
          </Text>
        </Modal>
        <Button
          title={isPickerVisible ? "Confirm Age" : "Select Age"}
          onPress={() => setIsPickerVisible(!isPickerVisible)}
        />
        {selectedAge && !isPickerVisible && (
          <View style={styles.ageBox}>
            <Text>
              {`Umur Sapi: ${Math.floor(selectedAge / 12)} tahun ${
                selectedAge % 12
              } bulan`}
            </Text>
          </View>
        )}
        {isPickerVisible && (
          <CowAgePicker
            onChange={handleAgeChange}
            showPicker={isPickerVisible}
            setShowPicker={setIsPickerVisible}
          />
        )}
      </Camera>
      {capturedImage && (
        <TouchableOpacity onPress={() => setShowImageModal(true)}>
          <Image
            source={{ uri: capturedImage?.uri }}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      )}
      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)}>
        <Image source={{ uri: capturedImage?.uri }} style={styles.fullImage} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 4)",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 24,
  },
  modalContainer: {
    top: 10,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  modal: {
    fontSize: 10,
    color: "#000000",
    textAlign: "center",
    bottom: 8,
  },
  logoinfo: {
    height: 15,
    marginRight: 2,
    top: 6,
  },
  buttoncam: {
    //paddingBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "30%",
    //textAlign: "center",
  },
  sticker: {
    position: "absolute",
    top: 150,
    bottom: 200,
    right: -30,
    height: 450,
    width: 450,
  },
  thumbnail: {
    width: 75,
    height: 75,
    position: "absolute",
    bottom: 100,
    right: 10,
    borderRadius: 5,
  },
  fullImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
export default CameraScreen;
