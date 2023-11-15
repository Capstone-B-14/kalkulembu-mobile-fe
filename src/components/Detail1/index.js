import { View, Text, Image } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import Feather from "react-native-vector-icons/Feather";
import DetailOption from "../DetailOption";

const Detail1 = ({ name, sex, healthy }) => {
  return (
    <View className='p-5 mt-10 shadow-lg'>
      <View className='bg-[#A3BFD9] p-2 rounded-t-xl flex-row items-center '>
        <Entypo name='chevron-left' size={25} />
        <Text className='ml-2 text-base font-bold mr-44'>Informasi Sapi</Text>
        <DetailOption />
      </View>
      <View className='bg-[#FBFBFB] p-4 rounded-b-xl  flex-row'>
        <Image
          className='ml-1 mr-5'
          source={require("../../../assets/profil-logo.png")}
        />
        <View className='gap-0.5 ml-1'>
          <Text className='text-[27px] font-bold mb-0.5'>{name}</Text>
          <View className='flex-row mb-0.5 items-center'>
            <Foundation name='male-symbol' size={20} />
            <Text className='ml-1 mr-2 text-[15px]'>{sex}</Text>
            <Feather name='smile' size={18} />
            <Text className='ml-1 text-[15px]'>{healthy}</Text>
          </View>
          {/* <View className="flex-row">
            <Text className="mr-4 text-[14px]">Tanggal Lahir Sapi</Text>
            <Text className="font-bold text-[14px]">11-10-2023</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default Detail1;
