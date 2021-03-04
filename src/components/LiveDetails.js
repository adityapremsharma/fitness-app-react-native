import React, {useState, useEffect, useContext} from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import {Context as FitnessContext} from "../context/FitnessContext"

export default function LiveDetails() {
    const {state: {distance, duration, pace, start, kcal}, setKcal} = useContext(FitnessContext)
    const weight = 80

    const [btnSelected, setButtonSelected] = useState("run")
    const backgroundColor = start ? {backgroundColor: "rgba(57, 255 ,20, .6)"} : {backgroundColor: "#39FF14"}

    const caloriesBurnt = () => {
        switch(btnSelected) {
            case "run":
                if(pace <= 15 && pace >= 10) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 6.5 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else if(pace < 10 && pace >= 5) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 5 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else if(pace < 5 && pace >= 0.5) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 3.5 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else {
                    return
                }
                
            case "walk":
                if(pace <= 5 && pace >= 3) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 3 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else if(pace < 3 && pace >= 2) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 2.5 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else if(pace < 2 && pace >= 0.2) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 2 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else {
                    return
                }
            case "cycle":
                if(pace <= 28 && pace >= 15) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 6.5 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else if(pace < 15 && pace >= 10) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 5 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } 
                else if(pace < 10 && pace >= 6) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 2.5 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else if(pace < 6 && pace >= 0.5) {
                    const caloriesBurnt = (duration / 60) * (3.5 * 2 * weight)  / 200
                    setKcal(kcal + caloriesBurnt)
                } else {
                    return
                }
            default:
                return
        }
        
    }

    useEffect(() => {
        caloriesBurnt()
    }, [duration, btnSelected])

    return (
        <View style={styles.container}>
            <Text style={styles.calories}>{Math.round(kcal)}<Text style={{fontSize: 32}}>/kcal</Text></Text>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
                        style={[styles.button, backgroundColor]}
                        onPress={() => null}
                    ><Text>FINISH</Text></TouchableOpacity>
                    </View>
            <View style={styles.miniButtonContainer}>
            <TouchableOpacity title="run" onPress={() => setButtonSelected("run")} style={btnSelected === "run" ? styles.btnSelected : styles.btnNotSelected} ><View style={styles.icon}><FontAwesome5 name="running" size={24} color="#e91e63" /></View></TouchableOpacity>
            <TouchableOpacity title="walk" onPress={() => setButtonSelected("walk")} style={btnSelected === "walk" ? styles.btnSelected : styles.btnNotSelected} ><View style={styles.icon}><FontAwesome5 name="walking" size={24} color="#e91e63" /></View></TouchableOpacity>
            <TouchableOpacity title="bicycle" onPress={() => setButtonSelected("cycle")} style={btnSelected === "cycle" ? styles.btnSelected : styles.btnNotSelected} ><View style={styles.icon2}><Ionicons name="bicycle" size={24} color="#e91e63" /></View></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        // flexDirection: "column",
    },
    calories: {
        color: "#777", 
        fontSize: 64, 
        textAlign: "center"
    },
    buttonContainer: {
        alignItems: "center",
        marginRight: 40,
        marginTop: 30
    },
    button: {
    alignItems: "center",
    borderRadius: 20,
    padding: 15,

    },
    miniButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginRight: 40,
        bottom: -40
    },
    icon: {
        left: 16,
        top: 12
    },
    icon2: {
        left: 12,
        top: 12
    },
    btnSelected: {
        backgroundColor: "#39FF14",
        width: 50,
        height: 50,
        borderRadius: 50
    },
    btnNotSelected: {
        backgroundColor: "#040b14",
        width: 50,
        height: 50,
        borderRadius: 50
    }
})