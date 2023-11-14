import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert, ScrollView } from "react-native";

import { useUser } from "../../contexts/UserContext";
import axiosInstance from "../../utils/axios";
import CustomHeader from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Kartu from "../../components/Kartu";

const SapiScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [cattle, setCattle] = useState([]);

  const { userData } = useUser();
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const userId = parsedUserData ? parsedUserData.id : null;

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    const fetchCattle = async () => {
      try {
        const farmsRequest = axiosInstance.get(`/users/${userId}/farms`);
        const cattleRequest = farmsRequest.then((response) => {
          const farmId = response.data.data[0].id;
          return getImages(farmId);
        });

        // const [cattleResponse] = await Promise.all([
        //   farmsRequest,
        //   cattleRequest,
        // ]);
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

    const getImages = async (id) => {
      try {
        const response = await axiosInstance.get(`/farms/${id}/cattle/latest`);
        if (response.status === 200) {
          setCattle(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
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
                photo='https://reactjs.org/logo-og.png'
                name={item.name.split(" ")[0]}
                weight={item.latestStats?.weight}
                healthy={item.latestStats?.healthy}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SapiScreen;
