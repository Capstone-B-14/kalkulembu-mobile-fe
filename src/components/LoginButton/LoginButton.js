import react from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


const LoginButton = ({onPress, text}) => {
    return (
        <Pressable onPress={onPress} style={styles.press}>
            <Text style={styles.text}>Masuk</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create ({
    press : {
        backgroundColor: "#FFDF64",
        
        padding: 13,
        alignItems:'center',
        borderRadius: 10,
        marginLeft:30,
        marginRight:30,
        marginTop:20
      
    },
    text : {
        fontWeight : 'bold',
        color: '#000',
        fontSize :18
    }
});

export default LoginButton 