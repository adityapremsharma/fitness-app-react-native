import React, {useState} from 'react'
import { View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function LogIn({navigation}) {
    const [inputUserData, setInputUserData] = useState({
        email: "",
        password: ""
    })

    return (
        <View style={{flex: 1, paddingVertical: "40%", paddingHorizontal: "20%", backgroundColor: "black"}}>
            <Image style={styles.logo} source={require("../../../assets/images/logo-black.png")} />

            <TextInput style={styles.input} placeholder="E-mail" onChange={(email) => setInputUserData({...inputUserData, email: email})} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChange={(password) => setInputUserData({...inputUserData, password: password})} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyTabs")} ><Text style={styles.text}>Log In</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => null}><Text>Forgot Password? CLICK HERE</Text></TouchableOpacity>
            <Text style={{color: "white", textAlign: "center", fontSize: 16, marginBottom: 20}}>Log In via:</Text>
            <View style={styles.altLogin}>
            
            <TouchableOpacity><AntDesign name="google" size={36} color="white" /></TouchableOpacity>
            <TouchableOpacity><AntDesign name="facebook-square" size={36} color="white" /></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        borderRadius: 20,
        alignSelf: "center",
        marginBottom: 10
    },
    input: {
        backgroundColor: "white",
        borderRadius: 5,
        marginVertical: 20,
        height: 40,
        paddingHorizontal: 10
    },
    button: {
        borderColor: "white",
        borderWidth: 1.5,
        marginVertical: 20,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: 40,
        marginHorizontal: "30%",
        borderRadius: 50,
        justifyContent: "center"
    },
    text: {
        alignSelf: 'center',
        color: "white",
        fontSize: 16,
        fontWeight: '600',
    },
    altLogin: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "10%"
    }

})