import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import  Feather  from 'react-native-vector-icons/Feather';

const Camera = () => {
  return (
    <View className="absolute flex-1  bottom-8 right-9">
        <TouchableOpacity className="bg-[#2E78A6] p-4 rounded-full sticky shadow-lg">
        <Feather name='camera' size={35}/>
        </TouchableOpacity>
    </View>
  );
};

export default Camera;
