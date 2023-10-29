import React from "react";
import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";

const AuthModal = ({ isVisible, onLogin, onGoBack }) => {
  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            You need to login to access this feature.
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={onGoBack}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    padding: 10,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AuthModal;
