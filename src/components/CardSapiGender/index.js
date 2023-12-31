import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardSapiGender = ({ icon, title, text, amount }) => {
  return (
    <View className="p-4 mb-2 m-1 bg-[#0D0D0D] rounded-3xl w-[160px] h-[75px] flex flex-row">
      <View className="flex basis-1/4 flex justify-center">
        {icon && <Icon name={icon} size={25} color="#FBFBFB" />}
      </View>
      <View className="flex basis-2/3 mb-2 mt-2 justify-center">
        <Text className="text-md text-[#FBFBFB]">{title}</Text>
        <View className="flex flex-row items-end sm: gap-x-1">
          <Text style={{
            fontFamily: "Raleway-Bold",
            fontSize: 23,
            fontWeight: "bold",
          }}
            className="text-[#FBFBFB]">{amount}</Text>
          <Text className="text-md text-[#FBFBFB]">{text}</Text>
        </View>
      </View>

    </View>
  );
};

export default CardSapiGender;
