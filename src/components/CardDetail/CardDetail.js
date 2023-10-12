import react from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';


const CardDetail = ({}) => {
    return (
        <View className="p-5">
            <View className="bg-[#A3BFD9] p-2 rounded-t-xl flex-row items-center ">
                <Image className="ml-1" source={require('../../../assets/back-logo.png')} />
                <Text className="ml-1 mr-5 font-bold text-base">Informasi Sapi</Text>
                <Image className="ml-40" source={require('../../../assets/option-logo.png')} />
            </View>
            <View className="bg-[#FBFBFB] p-4 rounded-b-xl  flex-row">
                <Image className="ml-1 mr-5" source={require('../../../assets/profil-logo.png')} />
                <View className="gap-0.5">
                    <Text className="text-2xl font-bold">Jagoan Neon</Text>
                    <View className="flex-row items-center">
                        <Image source={require('../../../assets/jantan-logo.png')} />
                        <Text className="mr-2">Jantan</Text>
                        <Image className="mr-1" source={require('../../../assets/sehat-logo.png')} />
                        <Text>Sehat</Text>
                    </View>
                    <View className="flex-row">
                        <Text className="mr-4">Tanggal Lahir Sapi</Text>
                        <Text className="font-bold">11-10-2023</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};


export default CardDetail 