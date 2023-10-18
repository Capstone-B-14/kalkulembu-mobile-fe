import React from "react";
import { View, Text } from "react-native";
import CustomHeader from "../../components/Header";

const CameraScreen = ({ navigation }) => {
  return (
    <View>
      <CustomHeader title='Kamera' />
      <Text>Ini Camera</Text>
    </View>
  );
};
export default CameraScreen;
