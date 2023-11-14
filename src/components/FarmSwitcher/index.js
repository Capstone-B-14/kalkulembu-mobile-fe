import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import axiosInstance from "../../utils/axios";
import Dropdowns from "../../components/Dropdown"; // Your dropdown component
import { useUser } from "../../contexts/UserContext";

const FarmSwitcher = () => {
  const [farms, setFarms] = useState([]);
  const { userData, isAuthenticated, currentFarm, setFarmProfileData } = useUser();
  const parsedUserData = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const fetchFarms = async () => {
      let response;
      try {
        if (parsedUserData && isAuthenticated) {
          response = await axiosInstance.get(
            `/users/${parsedUserData.id}/farms`
          );
        } else {
          response = await axiosInstance.get(
            `/farms`
          );
        }
        // console.log(response.data.data);
        setFarms(response.data.data);
        // Set default selected farm if none is selected
        if (!currentFarm && response.data.data.length > 0) {
          setFarmProfileData(response.data.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching farms:", error);
      }
    };
    // Only run if userData is available and no farm is selected
    fetchFarms();
  });

  const handleFarmChange = async (farmId) => {
    setFarmProfileData(farmId.value);
    console.log(currentFarm);
  };

  return (
    <View>
      <Dropdowns
        placeholder='Pilih Peternakan'
        selectedValue={currentFarm}
        onSelect={handleFarmChange}
        options={farms?.map((farm) => ({ label: farm.name, value: farm.id }))}
      />
    </View>
  );
};

export default FarmSwitcher;
