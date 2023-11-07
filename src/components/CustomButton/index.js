import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Button = ({
  onPress,
  text,
  backgroundColor,
  textColor,
  navigation,
  routeName,
}) => {
  const handleNavigate = () => {
    if (navigation && routeName) {
      navigation.navigate(routeName);
    }
  };
  return (
    <Pressable
      onPress={onPress || handleNavigate}
      style={[styles.press, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  press: {
    padding: 13,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 2,
  },
  text: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 18,
  },
});

export default Button;
