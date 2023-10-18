import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({ onPress, text, style, backgroundColor }) => {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.press,
          {
            backgroundColor: pressed ? backgroundColor : backgroundColor,
            width: "100%",
          },
          style,
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
  press: {
    flex: 1,
    padding: 13,
    alignSelf: "center",
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#000",
    fontSize: 18,
  },
});

export default CustomButton;
