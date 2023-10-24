import React, {useState} from "react";
import { View, Text } from "react-native";
import CustomHeader from "../../components/Header";
import Dropdowns from "../../components/Dropdown";

const CameraScreen = ({ navigation }) => {
  const options=[
    {label: '3 Bulan', value:'3bulan'},
    {label: '6 Bulan', value:'6bulan'},
  ];

  const [selectedOption, setSelectedOption]= useState(null);
  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <View>
      <CustomHeader title='Kamera' />
      <Text>Ini Camera</Text>
      <Dropdowns options={options} selectedValue={selectedOption} onSelect={handleDropdownChange} placeholder='Pilih Umur Sapi' search searchPlaceholder='Cari Umur Sapi'/>
    </View>
  );
};
export default CameraScreen;
