import { View, Text, Image } from 'react-native';

const Card = () => {
  return (
    <View className="ml-3">
      <View className="bg-[#FFFFFF] p-2 rounded-xl w-[109px] h-[160px]">
        <Image source={require('../../../assets/gambarCard-logo.png')} />
        <View className="items-center mt-3">
          <Text className="text-xs">78 kg</Text>
          <Text className="text-xs">12-07-2023</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

