import React from 'react';
import { View, Text, Image } from 'react-native';

const Kartu = ({photo, name, weight, kondisi}) => {
  const getKondisiLabel=()=>{
    if (kondisi == "sehat"){
      return(
        <View className="bg-[#A3BFD9] w-[45px] h-[20px] rounded rounded-lg items-center justify-center">
          <Text className="text-xs font-bold">Sehat</Text>
        </View>
      );
    } else if(kondisi == "sakit"){
      return(
        <View className="bg-[#E78383] w-[45px] h-[20px] rounded rounded-lg items-center justify-center">
          <Text className="text-xs font-bold">Sakit</Text>
        </View>
      );
    } else{
      return "Unknown";
    }
  };

  return (
    <View className="mx-4 my-4">
      <View className="bg-[#FFFFFF] p-2 rounded-xl w-[170px] h-[230px] shadow-lg flex flex-col drop-shadow drop-shadow-lg">
        <View className="flex items-center">
          <View className="bg-transparent w-[150px] h-[150px] rounded rounded-xl">
            <Image source={{uri: photo}} style={{width: 150, height: 150}} />
          </View>
        </View>
          <View className="flex flex-row my-3">
            <View className="flex basis-1/2 mx-2">
              <Text className="text-lg font-bold">{name}</Text>
              <Text className="text-md font-medium">{weight} kg</Text>
            </View>
            <View className={`mx-2 my-1 w-[55px] h-[25px] rounded rounded-lg ${getKondisiLabel(kondisi)}`}>
              {typeof getKondisiLabel(kondisi) === 'object' ? (
                getKondisiLabel(kondisi)
                ) : (
                <Text className="text-md font-bold">{kondisi}</Text>
              )}
            </View>
          </View>

      </View>
    </View>
  );
};

export default Kartu;

