import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardSapiCond = ({ healthy, sick }) => {
    return (
        <View className="flex-row px-5">
            <View className="p-3 my-2 m-1 bg-[#FBFBFB] rounded-3xl w-[150px] h-[150px] flex flex-col items-center mr-3">
                <View className="w-[95px] h-[12px] absolute bg-[#A3BFD9] rounded-bl-3xl rounded-br-3xl"></View>
                <View className="py-1 flex justify-center">
                    <Icon name="emoticon-happy-outline" size={30}></Icon>
                </View>
                <View className="flex flex-col items-center">
                    <View className="">
                        <Text className='text-[#0D0D0D]' style={{ fontFamily: "Roboto-Regular", fontSize: 18 }}>Sapi Sehat</Text>
                    </View>
                    <View className="">
                        <Text className='text-[#0D0D0D]' style={{ fontFamily: "Raleway-Bold", fontSize: 35, fontWeight: "bold" }}>{healthy}</Text>
                    </View>
                    <View className="">
                        <Text className='text-[#0D0D0D]' style={{ fontFamily: "Roboto-Regular", fontSize: 18 }}>ekor</Text>
                    </View>
                </View>
            </View>

            <View className="p-3 my-2 m-1 bg-[#FBFBFB] rounded-3xl w-[150px] h-[150px] flex flex-col items-center mr-3">
                <View className="w-[95px] h-[12px] absolute bg-[#E78383] rounded-bl-3xl rounded-br-3xl"></View>
                <View className="py-1 flex justify-center">
                    <Icon name="emoticon-sick-outline" size={30}></Icon>
                </View>
                <View className="">
                    <Text className='text-[#0D0D0D]' style={{ fontFamily: "Roboto-Regular", fontSize: 18 }}>Sapi Sakit</Text>
                </View>
                <View className="">
                    <Text className='text-[#0D0D0D]' style={{ fontFamily: "Raleway-Bold", fontSize: 35, fontWeight: "bold" }}>{sick}</Text>
                </View>
                <View className="">
                    <Text className='text-[#0D0D0D]' style={{ fontFamily: "Roboto-Regular", fontSize: 18 }}>ekor</Text>
                </View>
            </View>
        </View>

    );
};

export default CardSapiCond;