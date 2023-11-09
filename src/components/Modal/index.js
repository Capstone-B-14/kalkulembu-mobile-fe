import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Modal = ({ isOpen, children, style }) => {
  if (!isOpen) return null;

  return (
    <View style={[styles.modal, style]}>
      <View style={styles.modalContent}>
        <View style={styles.modalBody}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flexDirection: "row",
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: 15, // Increased padding for better spacing
    paddingVertical: 10,
    borderRadius: 20, // Rounded corners
    width: "92%",
  },
});

export default Modal;
