import React, {useContext} from 'react'
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Video } from 'expo-av';
import {Context as UserContext} from "../../context/UserContext"

export default function Landing({navigation}) {
        const {state: {guestUser}, setGuestUser} = useContext(UserContext)
    return (
        <View style={{flex: 1, justifyContent: "center"}}>
            <Video
                source={require("../../../assets/videos/landing-bg.mp4")}
                rate={1.0}
                isMuted={true}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.backgroundVideo}
            />
            <TouchableOpacity onPress={() => navigation.navigate("LogIn")} style={styles.button}><Text style={styles.text}>Log In</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.button}><Text style={styles.text}>Sign Up</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("BottomTabNavigation")} style={styles.button}><Text style={styles.text}>Enter as a Guest</Text></TouchableOpacity>
            
        </View>
    )
}

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
    backgroundVideo: {
        marginTop: "7.5%",
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    button: {
        borderColor: "white",
        borderWidth: 1.5,
        marginVertical: "5%",
        backgroundColor: 'rgba(0, 0, 0, 0)',
        height: "5%",
        marginHorizontal: "30%",
        borderRadius: 50,
        justifyContent: "center"
    },
    text: {
        alignSelf: 'center',
        color: "white",
        fontSize: 16,
        fontWeight: '600',
    }
});