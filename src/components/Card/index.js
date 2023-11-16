import { View, Text, Image } from "react-native";

const Card = ({ weight, measureDate }) => {
  return (
    <View className='ml-3'>
      <View className='bg-[#FFFFFF] p-2 rounded-xl w-[109px] h-[160px] shadow-lg'>
        <Image source={require("../../../assets/gambarCard-logo.png")} />
        <View className='items-center mt-3'>
          <Text className='text-xs'>{weight} kg</Text>
          <Text className='text-xs'>{measureDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;
