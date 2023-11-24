import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useUser } from "../../contexts/UserContext";
import axiosInstance from "../../utils/axios";
import CustomHeader from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Kartu from "../../components/Kartu";

const SapiScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [cattle, setCattle] = useState([]);
  const [farmId, setFarmId] = useState([]);
  const [cattleImages, setCattleImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userData } = useUser();
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const userId = parsedUserData ? parsedUserData.id : null;

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const navigation = useNavigation();

  const handleCardPress = (cattleId, farmId) => {
    // Navigate to the desired screen
    navigation.navigate("Detail Sapi", {
      cattleId: cattleId,
      farmId: farmId,
    });
  };

  useEffect(() => {
    const fetchCattle = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let farmsResponse;
        // If the user is logged in, use the endpoint with /users/:userId/farms
        if (userData && userId) {
          farmsResponse = await axiosInstance.get(`/users/${userId}/farms`);
        } else {
          // If the user is not logged in, use the endpoint with /farms
          farmsResponse = await axiosInstance.get("/farms");
          // console.log(farmsResponse.data.data);
        }

        // Assuming the farm data is in the response and you want the first farm's details
        const farmId = farmsResponse.data.data[0].id;
        const cattleResponse = await axiosInstance.get(
          `/farms/${farmId}/cattle/latest`
        );
        setCattle(cattleResponse.data.data);
        setFarmId(farmId); // Assuming you want to store the entire farm object
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCattle();
  }, [userData, userId]);

  // Latest cattle images
  useEffect(() => {
    const fetchCattleImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Assuming you have an array of cattle objects
        const allCattleImages = await Promise.all(
          cattle.map(async (cow) => {
            const response = await axiosInstance.get(
              `/cattle/${cow.id}/images`
            );
            return {
              cowId: cow.id,
              images: response.data.data,
            };
          })
        );

        // Now allCattleImages is an array of objects with cowId and images
        setCattleImages(allCattleImages);
        console.log(cattleImages[0].images[0].url);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (cattle && cattle.length > 0) {
      fetchCattleImages();
    }
  }, []);

  return (
    <View className='h-full sm: w-auto'>
      <CustomHeader title='Sapi' showUserData={false} />
      <View className='flex items-end mx-4'>
        <SearchBar
          placeholder='Cari Sapi'
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView className='my-2'>
        <View className=''>
          <View className='flex flex-row flex-wrap h-full w-full items-center justify-between'>
            {cattle.map((item) => (
              <Kartu
                key={item.id}
                photo={cattleImages[0].images[0].url}
                name={item.name.split(" ")[0]}
                weight={item.latestStats?.weight}
                healthy={item.latestStats?.healthy}
                onPress={() => {
                  handleCardPress(item.id, farmId);
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SapiScreen;
