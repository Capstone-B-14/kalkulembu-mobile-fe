import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from '../../components/SearchBar';

const HomeScreen = () => {
    const [searhText, setSearchText]= useState('');

    const handleSearch=(text)=>{
        setSearchText(text);
    }

    return(
        <View>
            <SearchBar 
                placeholder="Pencarian"
                value={searhText}
                onChangeText={handleSearch}
                />
        </View>
    );
}

export default HomeScreen