import React from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

const CustomButton = ({ onPress, text, style, backgroundColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[
        styles.button,
        style,
        { backgroundColor } // Apply backgroundColor here
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 13,
    alignItems: "center",
    backgroundColor: 'blue',
  },
  text: {
    fontWeight: "bold",
    color: "#0D0D0D",
    fontSize: 18,
  },
});

export default CustomButton;
