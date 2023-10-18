import { View, Text, Image } from 'react-native';
import react from 'react';
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native';

const Camera = () => {
  return (
    <View className=" absolute flex-1 bottom-20 right-9">
        <TouchableOpacity className="bg-[#2E78A6] p-4 rounded-full sticky">
        <Feather name='camera' size={37}/>
        </TouchableOpacity>
    </View>
  );
};

export default Camera;
