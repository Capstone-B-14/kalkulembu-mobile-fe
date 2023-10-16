import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from '../../components/SearchBar';

const HomeScreen = () => {
    const [searchText, setSearchText]= useState('');

    const handleSearch=(text)=>{
        setSearchText(text);
    }

    return(
        <View>
            <SearchBar 
                placeholder="Pencarian"
                value={searchText}
                onChangeText={handleSearch}
            />
        </View>
    );
}

export default HomeScreen