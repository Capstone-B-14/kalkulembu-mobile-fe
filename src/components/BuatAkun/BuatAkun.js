import react from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const BuatAkun = ({onPress, text}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.press}>
            <Text style={styles.text}>Buat Akun Baru</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create ({
    press : {
        backgroundColor: '#DDDDDDDD',
        padding: 13,
        alignItems:'center',
        borderRadius: 10,
        marginLeft:30,
        marginRight:30,
        marginTop:20
      
    },
    text : {
        fontWeight : 'bold',
        color: 'white',
        fontSize: 18
    }
});

export default BuatAkun 