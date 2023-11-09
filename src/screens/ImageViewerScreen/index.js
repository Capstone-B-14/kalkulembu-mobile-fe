import React, { memo, useRef, useMemo, useState } from "react";
import {
  View,
  Image,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ImageWrapper, ImageViewer } from "react-native-reanimated-viewer";
import { useNavigation } from "@react-navigation/native";

const ImageViewerScreen = ({ route }) => {
  const imageRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const { capturedImages = [] } = route.params || {};

  const navigation = useNavigation();

  const imageData = useMemo(
    () =>
      capturedImages.map((img) => ({
        key: `key-${img.uri}`,
        source: { uri: img.uri },
      })),
    [capturedImages]
  );

  const handleLongPress = (image) => {
    setSelectedImage(image[0].source);
    console.log(image);
    // console.log(image.source);
    setModalVisible(true);
  };

  const goToCameraResult = () => {
    setModalVisible(false);
    // console.log(selectedImage);
    if (selectedImage) {
      navigation.navigate("CameraResult", { uri: selectedImage.uri });
    }
  };

  return (
    <>
      <ImageViewer
        ref={imageRef}
        data={imageData}
        onLongPress={() => handleLongPress(imageData)}
      />
      {modalVisible && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.modalImage}
                />
              )}
              <Text style={styles.modalText}>
                Anda yakin ingin memilih gambar ini?
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={goToCameraResult}
              >
                <Text style={styles.buttonText}>Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <View style={{ flexDirection: "row" }}>
        {imageData.map((img, index) => (
          <ImageWrapper
            key={img.source.uri}
            viewerRef={imageRef}
            index={index}
            source={{
              uri: img.source.uri,
            }}
          >
            <Image
              source={{
                uri: img.source.uri,
              }}
              style={{ width: 100, height: 100 }}
            />
          </ImageWrapper>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 300,
    height: 300,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default memo(ImageViewerScreen);
