import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import mime from "mime";
import axios from "axios";

import Dropdowns from "../../components/Dropdown";
import axiosInstance from "../../utils/axios";
import { useUser } from "../../contexts/UserContext";
import Button from "../../components/CustomButton";

const statusBarHeight = Constants.statusBarHeight;

const CameraResult = ({ route }) => {
  const { source, uri, cowAge } = route.params;
  const navigation = useNavigation();
  // Specific stats states
  const [healthy, setHealthy] = useState(true);

  // Dropdown states and dependencies
  const [selectedOption, setSelectedOption] = useState(null);
  const [farms, setFarms] = useState([]);
  const [cattle, setCattle] = useState([]);
  const [cattleStats, setCattleStats] = useState([]);
  const { userData } = useUser();

  // Upload image states
  const [selectedImage, setSelectedImage] = useState(uri);
  const [loading, setLoading] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const parsedUserData = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const userId = parsedUserData.id;

    // console.log(userId);
    const fetchCattle = async () => {
      try {
        const farmsRequest = axiosInstance.get(`/users/${userId}/farms`);
        const cattleRequest = farmsRequest.then((response) => {
          const farmId = response.data.data[0].id;
          return axiosInstance.get(`/farms/${farmId}/cattle`);
        });

        const [farmsResponse, cattleResponse] = await Promise.all([
          farmsRequest,
          cattleRequest,
        ]);

        // console.log(cattleResponse.data);
        setFarms(farmsResponse.data.data);
        setCattle(cattleResponse.data.data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Server responded with an error: ",
            error.response.data
          );
          Alert.alert("Error", "There was an error fetching the data.");
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response was received: ", error.request);
          Alert.alert("Error", "No response from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message: ", error.message);
          Alert.alert("Error", "There was an error setting up the request.");
        }
      }
    };

    fetchCattle();
  }, []);

  const handleDropdownChange = async (cattleId) => {
    setSelectedOption(cattleId.value);

    try {
      const statsResponse = await axiosInstance.get(
        `/cattle/${cattleId.value}/stats`
      );
      setCattleStats(statsResponse.data.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server responded with an error: ", error.response.data);
        Alert.alert("Error", "There was an error fetching the data.");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response was received: ", error.request);
        Alert.alert("Error", "No response from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message: ", error.message);
        Alert.alert("Error", "There was an error setting up the request.");
      }
    }
  };

  const submitStats = async () => {
    const payload = {
      age: Number(cowAge),
      weight: 696,
      healthy: healthy,
    };
    if (selectedOption) {
      try {
        const response = await axiosInstance.post(
          `/cattle/${selectedOption}/stats/${new Date().toISOString()}`,
          payload
        );
        if (response.status === 201) {
          setIsImageUploaded(true);
          setLoading(false);
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Server responded with an error: ",
            error.response.data
          );
          Alert.alert("Error", "There was an error fetching the data.");
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response was received: ", error.request);
          Alert.alert("Error", "No response from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message: ", error.message);
          Alert.alert("Error", "There was an error setting up the request.");
        }
      }
    }
  };

  const dropdownOptions = cattle.map((cattle) => ({
    label: cattle.name,
    value: cattle.id.toString(),
  }));

  const uploadImage = async () => {
    let base64Img = `data:image/jpeg;base64,${source}`; // Make sure the MIME type matches the image type
    let apiURL = "https://api.cloudinary.com/v1_1/kalkulembu/image/upload";
    let data = new FormData();
    data.append("file", base64Img);
    data.append("upload_preset", "czpjcbx2");
    data.append("unsigned", true);

    try {
      const response = await axios.post(apiURL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        console.log(response.data.secure_url);
        await submitImage(response.data.secure_url);
        // await submitStats();
      }
    } catch (error) {
      console.error(error); // Log the error response from the server
    }
  };

  const submitImage = async (sendUri) => {
    const payload = {
      imageUrl: sendUri,
    };
    if (selectedOption) {
      try {
        const response = await axiosInstance.post(
          `/cattle/${selectedOption}/saveImageUrl`,
          payload
        );
        if (response.status === 200) {
          setIsImageUploaded(true);
          setLoading(false);
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(
            "Server responded with an error: ",
            error.response.data
          );
          Alert.alert("Error", "There was an error fetching the data.");
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response was received: ", error.request);
          Alert.alert("Error", "No response from the server.");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message: ", error.message);
          Alert.alert("Error", "There was an error setting up the request.");
        }
      }
    }
  };

  // const uploadImage = async () => {
  //   if (!uri) {
  //     Alert.alert("Upload Error", "No image to upload.");
  //     return;
  //   }
  //   setLoading(true);

  //   // Ensure proper file name and mime type
  //   const fileType = mime.getType(uri);
  //   const formData = new FormData();
  //   formData.append("file", uri);
  //   formData.append("name", "image");
  //   formData.append("type", fileType);

  //   try {
  //     const response = await axiosInstance.post(
  //       `cattle/${selectedOption}/images`,
  //       formData
  //     );
  //     if (response.status == 200) {
  //       Alert.alert("Success", "Image uploaded successfully!"); // Display a success message
  //       setIsImageUploaded(true);
  //       setLoading(false);
  //     } else {
  //       Alert.alert(
  //         "Upload Error",
  //         "The server responded with an unexpected status."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Upload Error: ", error);
  //     Alert.alert("Upload Error", "An error occurred during the upload.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <View style={styles.topButtons}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name='arrow-left' />
          <Text style={styles.back}>Kembali</Text>
        </TouchableOpacity>
        <Button
          text='Submit'
          style={styles.submit}
          backgroundColor='#2E78A6'
          textColor='#FBFBFB'
          onPress={async () => {
            setLoading(true); // start loading before operations
            try {
              await uploadImage(); // wait for upload image
              await submitStats(); // then submit THE STATS MASON WHAT DO THEY MEAN
            } catch (error) {
              // handle any errors that occur during the process
              console.error("An error occurred:", error);
              Alert.alert("Error", "Failed to submit data.");
            }
            setLoading(false); // stop loading after operations
          }}
          disabled={loading || !selectedOption}
        />
      </View>
      <View style={styles.topContainer}>
        <Image source={{ uri }} style={styles.image} />
        <View style={styles.healthSwitch}>
          <Text>Apakah sapi sehat?</Text>
          <Switch onValueChange={setHealthy} value={healthy} />
        </View>
        <View style={styles.bottomContainer}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.bottomContainer}>
              <Dropdowns
                options={dropdownOptions}
                selectedValue={selectedOption}
                onSelect={handleDropdownChange}
                placeholder='Pilih Sapi'
                search
                searchPlaceholder='Pilih Sapi'
              />
              {isImageUploaded &&
                cattleStats.length > 0 &&
                cattleStats.map((stat, index) => (
                  <View key={index} style={styles.statContainer}>
                    <View style={styles.statDetails}>
                      <Text>Usia: {stat.age} bulan</Text>
                      <Text>Bobot: {stat.weight} kg</Text>
                      <Text>{stat.healthy ? "Sehat" : "Sakit"}</Text>
                    </View>
                    <Text style={styles.statDate}>
                      {new Date(stat.measuredAt).toLocaleDateString("id-ID")}{" "}
                      {new Date(stat.measuredAt).toLocaleTimeString("id-ID")}
                    </Text>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    alignItems: "center",
  },
  topButtons: {
    marginTop: statusBarHeight + 25,
    marginHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  submit: {
    backgroundColor: "#2E78A6",
  },
  image: {
    width: "75%",
    height: "60%",
    resizeMode: "contain",
    marginVertical: 20,
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  healthSwitch: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    left: 50,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 5,
  },
  statDetails: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  statDate: {
    marginLeft: 20,
  },
  back: {
    fontSize: 20,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default CameraResult;
