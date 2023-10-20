import React from "react";
import { View, Text } from "react-native";
import CustomHeader from "../../components/Header";

const SapiScreen = () => {
  return (
    <View>
      <CustomHeader title='Sapi' showUserData={false} />
      <Text>Ini Sapi</Text>
    </View>
  );
};
export default SapiScreen;
