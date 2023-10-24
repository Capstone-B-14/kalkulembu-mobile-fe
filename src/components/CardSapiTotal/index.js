import react, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CardSapiTotal = () => {
    return(
        <View className="p-4 h-[156px] w-[211px] bg-[#2E78A6] rounded rounded-3xl flex justify-center">
            <View className="flex flex-row justify-between mb-2">
                <View className="flex basis-1/3 m-1">
                    <Icon name="cow" size={55} color="#FBFBFB"/>
                </View>                
                <View className="flex basis-2/3">
                    <Text className="text-[#FBFBFB]" style={{fontFamily:'Roboto', fontSize:20}}>Total Sapi</Text>
                    <View className="flex flex-row items-end">
                        <Text className="text-[#FBFBFB]" style={{fontFamily:'Raleway', fontSize:40, fontWeight: 'bold'}}>85</Text>
                        <Text className="text-[#FBFBFB]" style={{fontFamily:'Roboto', fontSize:20}}>ekor</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        background: 'linear-gradient(to bottom, #2E78A6, #1C4965)',
    },
});

export default CardSapiTotal