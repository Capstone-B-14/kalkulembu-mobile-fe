import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';


const CRUDSapi = () => {
  return (
    <View className="h-full">
        <View className=" mt-[90px] p-5 items-center ml-5 mr-5 mb-5">
            <Image 
            source={require('../../../assets/profil-logo.png')}
            style={{padding:5, height:100, width:100}}/>
            <TouchableOpacity>
            <Text className="mt-5 font-bold text-[#3E63DD]">Unggah foto sapi</Text>
            </TouchableOpacity>
        </View>
        <View className="m-5 shadow-lg">
        <View className=" ">
            <View className="bg-[#FBFBFB] rounded-t-2xl border-b-[1px] border-[#CCCCCC]">
                <Text className="text-[16px] pl-4 pr-4 pt-4 pb-2">Nama</Text>
                <TextInput placeholder="Nama" className="pl-4 pr-4 pt-2 pb-4"></TextInput>
            </View>
            <View className="bg-[#FBFBFB] border-b-[1px] border-[#CCCCCC]">
                <Text className="text-[16px] pl-4 pr-4 pt-4 pb-2">Jenis Kelamin</Text>
                <TextInput placeholder="Jenis Kelamin" className="pl-4 pr-4 pt-2 pb-4"></TextInput>
            </View>
            <View className="bg-[#FBFBFB] border-b-[1px] border-[#CCCCCC]">
                <Text className="text-[16px] pl-4 pr-4 pt-4 pb-2">Kondisi</Text>
                <TextInput placeholder="Kondisi" className="pl-4 pr-4 pt-2 pb-4"></TextInput>
            </View>
            <View className="bg-[#FBFBFB]  rounded-b-2xl">
                <Text className="text-[16px] pl-4 pr-4 pt-4 pb-2">Tanggal Lahir</Text>
                <TextInput placeholder="Tanggal Lahir" className="pl-4 pr-4 pt-2 pb-4"></TextInput>
            </View>

            <TouchableOpacity className="shadow-lg items-center p-4 bg-[#FFDF64] mt-10 ml-24 mr-24 rounded-2xl">
                <Text className="font-bold text-[18px]">Simpan</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

export default CRUDSapi;
