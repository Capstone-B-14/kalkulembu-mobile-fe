import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = ({
  onPress,
  text,
  backgroundColor,
  textColor,
  navigation,
  routeName,
  style,
  disabled,
}) => {
  const handleNavigate = () => {
    if (navigation && routeName) {
      navigation.navigate(routeName);
    }
  };
  return (
    <TouchableOpacity
      onPress={onPress || handleNavigate}
      style={[
        styles.press,
        style,
        { backgroundColor: backgroundColor },
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  press: {
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: "#9ea4ad",
  },
});

export default Button;
