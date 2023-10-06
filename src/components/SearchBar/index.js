import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = ({icon, placeholder, value, onChangeText}) => {
    return(
        <View className="bg-[#FBFBFB] rounded-lg w-[167px] h-[40px] p-2 gap-x-2 flex-row justify-end items-center border border-[#DDDDDD]">
            <TextInput
                style="text-[#0D0D0D]"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
            <Icon name="search" size={20} color="#2E78A6"/>
        </View>
    );
};

export default SearchBar