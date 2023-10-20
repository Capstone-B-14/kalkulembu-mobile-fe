import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <View style={styles.modal}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.close} onPress={onClose}>
          <Text style={styles.closeText}>&times;</Text>
        </TouchableOpacity>
        <View style={styles.modalBody}>
            {children}
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  modal: {
    paddingBottom: 25,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  close: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
  closeText: {
    fontSize: 24,
  },
  modalBody: {
    padding: 10,
  },
});

export default Modal;