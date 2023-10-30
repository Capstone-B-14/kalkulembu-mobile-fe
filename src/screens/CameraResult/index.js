import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

const CameraResult = ({ route, navigation }) => {
  const { uri } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  image: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    marginBottom: 20
  }
});

export default CameraResult;
