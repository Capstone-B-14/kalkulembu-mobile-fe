import React from 'react';
import {View, Text, StyleSheet, Button, TextInput, Pressable, Image} from 'react-native';
import CardDetail from '../../components/CardDetail';
import Grafik from '../../components/Grafik';
import Card from '../../components/Card';

const SapiPageDetail = () => {
    return (
        <View>
            <CardDetail />
            <View style={styles.dua}>
            <View style={styles.umur}>
                <View style={styles.subumur}>
                <Text style={styles.textumur}>Umur</Text>
                </View>
                <View style={styles.bulan}>
                <Text style={styles.angka}>39</Text>
                <Text style={styles.satuan}>Bulan</Text>
                </View>
            </View>
            <View style={styles.umur}>
                <View style={styles.subumur}>
                <Text style={styles.textumur}>Bobot</Text>
                </View>
                <View style={styles.bulan}>
                <Text style={styles.angka}>95</Text>
                <Text style={styles.satuan}>kilogram</Text>
                </View>
            </View>
            </View>
            <Grafik />
            <View className="flex-row p-3">
            <Card />
            <Card />
            <Card />
            <Card />
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    dua : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        marginEnd : 40,
        marginStart : 40
        
    },
    umur : {
        backgroundColor: 'grey',
        flexDirection: 'row',
        borderRadius: 10,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        

    },
    subumur : {
        padding : 10,
        
    },
    textumur : {
        fontWeight: 'bold'
    },
    bulan : {
        backgroundColor: 'black',
        flexDirection: 'row',
        borderTopEndRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5
        
    },
    angka : {
        color: 'white',
        fontSize: 35,
        alignSelf: 'center'
    },
    satuan : {
        color: 'white',
        alignSelf: 'center'
    },
})

export default SapiPageDetail