import React, { useRef, useState } from 'react';
import { Modal } from 'react-native';
import { View, Text,  Pressable, TouchableOpacity,StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons'
import Entypo from 'react-native-vector-icons/Entypo'


const DetailOption = () => {
    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;
    function resizeBox(to) {
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration:200,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }

    return (
        <View>
            <TouchableOpacity onPress={() => resizeBox(1)}>
                <Entypo name="dots-three-horizontal" size={23} />
            </TouchableOpacity>
            <Modal transparent visible={visible}>
                <View onTouchStart={() => resizeBox(0)} className="flex-1 absolute h-full w-full bg-[#545454]/60 ">
                    <Animated.View 
                    style={[{opacity: scale.interpolate({inputRange:[0,1], outputRange:[0,1]})}]}
                    className="absolute rounded-2xl  bg-[#FBFBFB] top-[90px] right-3 ">
                            <View className=""></View>
                            <TouchableOpacity 
                            className="flex-row  items-center p-2 rounded-t-2xl border-b-[1px] border-[#CCCCCC] ml-1 mr-1">
                                <Icon name='brush' size={25} />
                                <Text className="ml-2 font-bold text-[16px]">Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            className="flex-row items-center p-2 ml-1 mr-1 rounded-b-2xl">
                                <Icon name='delete-alert-outline' size={25} />
                                <Text className="ml-2 mr-2 font-bold text-[16px] ">Hapus</Text>
                            </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    )
};

export default DetailOption 