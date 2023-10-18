import { View, Text, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';

const CardDetail = () => {
  return (
    <View className="p-5">
      <View className="bg-[#A3BFD9] p-2 rounded-t-xl flex-row items-center ">
        <Entypo name="chevron-left" size={25} />
        <Text className="ml-2 text-base font-bold mr-44">Informasi Sapi</Text>
        <Entypo name="dots-three-horizontal" size={23} />
      </View>
      <View className="bg-[#FBFBFB] p-4 rounded-b-xl  flex-row">
        <Image
          className="ml-1 mr-5"
          source={require('../../../assets/profil-logo.png')}
        />
        <View className="gap-0.5">
          <Text className="text-2xl font-bold">Jagoan Neon</Text>
          <View className="flex-row items-center">
            <Foundation name="male-symbol" size={20} />
            <Text className="ml-1 mr-2">Jantan</Text>
            <Feather name="smile" size={18} />
            <Text className="ml-1">Sehat</Text>
          </View>
          <View className="flex-row">
            <Text className="mr-4">Tanggal Lahir Sapi</Text>
            <Text className="font-bold">11-10-2023</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardDetail;
