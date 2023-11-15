import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


const Detail2 = ({ age, weight }) => {
    return (
        <View className="flex-row pl-5 pr-5 justify-between">
            <View className="flex-row bg-[#FBFBFB] rounded-2xl items-center shadow-lg">
                <Text className="font-bold mr-2 ml-2 p-2">Umur</Text>
                <View className="flex-row items-center bg-black rounded-r-2xl p-2">
                    <Text className="text-4xl text-white">{age}</Text>
                    <Text className="text-white">bulan</Text>
                </View>
            </View>

            <View className="flex-row bg-[#FBFBFB] rounded-2xl items-center shadow-lg">
                <Text className="font-bold mr-2 ml-2 p-2">Bobot</Text>
                <View className="flex-row items-center bg-black rounded-r-2xl p-2">
                    <Text className="text-4xl text-white">{weight}</Text>
                    <Text className="text-white">kilogram</Text>
                </View>
            </View>
        </View>
    );
};



export default Detail2; 