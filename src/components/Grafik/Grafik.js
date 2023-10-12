import react from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';




const Grafik = ({}) => {
    return (
        <View className="p-5">
            <View className="bg-[#FBFBFB] items-center p-2 rounded-xl ">
            <Text className="font-bold">Grafik Pertumbuhan Bobot Sapi (kg)</Text>
            <View className="mt-2">
                <View className="bg-[#D9D9D9] flex-row p-1.5 rounded-3xl">
                    <View className="bg-[#FFDF64] rounded-xl p-1">
                    <Text>  Bulan  </Text>
                    </View>
                    <View className="bg-[#D9D9D9] rounded-xl p-1">
                        <Text>  Tahun  </Text>
                    </View>
                </View>
            </View>
            <Text>INI GAMBAR Grafik</Text>
            </View>
        </View>
    )
};


export default Grafik 