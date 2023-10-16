import react from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CardSapiOverview = ({title, content, image, statusLabel}) => {
    //Defining status label's background color
    const statusColor={
        Sehat: '#A3BFD9',
        Sakit: '#E78383'
    }
    const backgroundColor = statusColor[statusLabel] || statusColor.Default;
    return (
        <View className={`rounded-xl bg-[#2E78A6]`}>
            {image && (<Image source={image}/>)}
            <Text className="text-xl font-semibold">{title}</Text>
            <Text className="text-md">{content}</Text>
            {statusLabel && (
                <View className={`m-2 p-2 rounded rounded-md bg-${backgroundColor} flex justify-center items-center`}>
                    <Text className="text-[#FBFBFB] text-sm">{statusLabel}</Text>
                </View>
            )}
        </View>
    );
};
export default CardSapiOverview