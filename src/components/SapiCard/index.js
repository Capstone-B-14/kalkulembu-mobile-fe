import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const SapiCard = ({image, name, weight, condition}) => {
  const getStatus = () => {
    if (condition == 'sehat') {
      return (
        <View>
            <View></View>
        </View>
      );
    } else if (condition == 'sakit') {
      return(
        <View>
          <View></View>
        </View>
      );
    } else {
      return "Unknown";
    }
  };

  return (
   <View classname="">
    <View classname="bg-black">
    <View classname="">
      <Image source={{uri: image}}/>
    </View>
    <View classname="">
      <Text>{name}</Text>
    </View>
    <View>
      <Text>{weight}</Text>
    </View>
    <View>
      <View>
        <Text>{condition}</Text>
      </View>
    </View>
    </View>
   </View>
  );
};

export default SapiCard;
