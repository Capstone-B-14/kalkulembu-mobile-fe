import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SearchBar from '../../components/SearchBar';
import CardSapiOverview from '../../components/CardSapiOverview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <CardSapiOverview></CardSapiOverview>
        </View>
    );
}

export default HomeScreen