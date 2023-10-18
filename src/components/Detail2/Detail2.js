import react from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


const Detail2 = ({}) => {
    return (
        <View className="flex-row pl-5 pr-5 justify-between">
            <View className="flex-row bg-[#FBFBFB] rounded-2xl items-center">
                <Text className="font-bold mr-2 ml-2 p-2">Umur</Text>
                <View className="flex-row items-center bg-black rounded-r-2xl p-2">
                    <Text className="text-4xl text-white">39</Text>
                    <Text className="text-white">Bulan</Text>
                </View>
            </View>

            <View className="flex-row bg-[#FBFBFB] rounded-2xl items-center">
            <Text className="font-bold mr-2 ml-2 p-2">Bobot</Text>
                <View className="flex-row items-center bg-black rounded-r-2xl p-2">
                    <Text className="text-4xl text-white">95</Text>
                    <Text className="text-white">Kilogram</Text>
                </View>
            </View>
        </View>
    )
};



export default Detail2 