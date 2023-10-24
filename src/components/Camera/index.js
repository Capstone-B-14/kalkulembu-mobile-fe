import { View, Text, Image } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native';

const Camera = () => {
  return (
    <View className=" absolute flex-1 bottom-5 right-8 shadow-xl">
        <TouchableOpacity className="bg-[#2E78A6] p-4 rounded-full sticky">
        <FontAwesome name='camera' size={35}/>
        </TouchableOpacity>
    </View>
  );
};

export default Camera;
