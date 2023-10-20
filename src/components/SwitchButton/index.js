import React, { useState } from 'react';
import { View, Text,  Pressable, TouchableOpacity,StyleSheet } from 'react-native';


const SwitchButton = ({}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <View className="bg-[#D9D9D9] flex-row p-1.5 rounded-3xl">
            <View className="bg-[#D9D9D9] rounded-xl">
                <TouchableOpacity style={{backgroundColor: selectedTab == 0? '#FFDF64' : '#D9D9D9'}} className=" rounded-2xl p-1.5"
                onPress={() => {setSelectedTab(0);}}>
                    <Text > Bulan </Text>
                </TouchableOpacity>
            </View>
            <View className="bg-[#D9D9D9] rounded-xl">
            <TouchableOpacity style={{backgroundColor: selectedTab == 1 ? '#FFDF64' : '#D9D9D9'}} className="bg-[#D9D9D9] rounded-2xl p-1.5"
            onPress={() => {setSelectedTab(1);}}>
                    <Text>Tahun</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default SwitchButton 