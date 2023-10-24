import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Camera from '../../components/Camera';
import { ScrollView } from 'react-native';
import Detail1 from '../../components/Detail1';
import Detail2 from '../../components/Detail2';
import Detail3 from '../../components/Detail3';
import Card from '../../components/Card';
import NavBar from '../../components/NavBar';

const DetailSapi = () => {
  return (
    <View className="mt-10">
    <ScrollView>
      <Detail1 />
      <Detail2 />
      <Detail3 />
      <ScrollView horizontal={true} className="flex-row flex p-3 ">
        <Card />
        <Card />
        <Card />
        <Card />
      </ScrollView>
    </ScrollView>
    <Camera />
    </View>
  );
};

const styles = StyleSheet.create({
  dua: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginEnd: 40,
    marginStart: 40,
  },
  umur: {
    backgroundColor: '#FBFBFB',
    flexDirection: 'row',
    borderRadius: 15,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  subumur: {
    padding: 10,
  },
  textumur: {
    fontWeight: 'bold',
  },
  bulan: {
    backgroundColor: 'black',
    flexDirection: 'row',
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    padding: 5,
  },
  angka: {
    color: 'white',
    fontSize: 35,
    alignSelf: 'center',
  },
  satuan: {
    color: 'white',
    alignSelf: 'center',
  },
});

export default DetailSapi;
