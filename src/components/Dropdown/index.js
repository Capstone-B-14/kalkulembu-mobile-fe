import React, {useEffect, useState} from 'react';
import {
    Alert,
    StatusBar,
    StyleSheet,
    Text,
    ToucrhableOpacity,
    View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';


const Dropdowns = ({options, selectedValue, onSelect, placeholder, searchPlaceholder, search}) => {
    const [selectedOption, setSelectedOption] = useState(selectedValue);
    const [isFocus, setIsFocus] = useState(false);

    return(
        <View className="bg-[#2E78A6] w-[170px] m-2 p-2 pl-2 rounded rounded-3xl">
            <Dropdown
                styles={[styles.dropdown]}
                iconStyle={[styles.iconStyle]}
                iconColor='#FBFBFB'
                placeholderStyle={[styles.placeholderStyle]}
                selectedTextStyle={[styles.selectedTextStyle]}
                itemContainerStyle={[styles.itemContainerStyle]}
                itemTextStyle={[styles.itemTextStyle]}
                inputSearchStyle={[styles.inputSearchStyle]}
                containerStyle={[styles.containerStyle]}
                activeColor='#0D0D0D'
                data={options}
                search={search}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={selectedOption}
                placeholder={placeholder}
                searchPlaceholder={searchPlaceholder}
                onFocus={()=> setIsFocus(true)}
                onChange={(value)=>{
                    setSelectedOption(value);
                    onSelect(value);
                }}
            />
        </View>
    );
};
export default Dropdowns;

const styles = StyleSheet.create({
    containerStyle:{
        backgroundColor:'#2E78A6',
    },
    dropdown:{
        height: '30px',
    },
    icon:{
        color:"#FBFBFB"
    },
    label:{
        position: 'absolute',
        backgroundColor: '#2E78A6',
        fontSize: 14,
    },
    iconStyle:{
        width: 20,
        height:20,
    },
    placeholderStyle:{
        fontSize:14,
        color:'#FBFBFB',
        textAlign:'center',
        
    },
    selectedTextStyle:{
        color:'#FBFBFB',
        textAlign:'center',

    },
    itemContainerStyle:{
        backgroundColor:'#2E78A6',
    },
    inputSearchStyle:{
      backgroundColor:'#FBFBFB',
      
    },
    itemTextStyle:{
        color:'#FBFBFB',
    }
})