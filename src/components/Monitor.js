import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import TimeFormat from "hh-mm-ss"

export default class Monitor extends React.Component {
    state = {duration: 0}

    componentDidMount() {
        this.interval = setInterval(() => this.setState({duration: this.state.duration + 1}), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
    
        const {distance, pace} = this.props
        const {duration} = this.state

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.distance}>
            <Text style={styles.textStyle}>{distance}</Text>
            </View>
            <View style={styles.row}>
                <View>
                    <FontAwesome5 name="running" size={24} color="white" />
                    <Text style={{color: "white"}}>{pace} m/s</Text>
                </View>
                <View>
                    <Ionicons name="time" size={24} color="white" />
                    <Text style={{color: "white"}}>{TimeFormat.fromS(duration, 'mm:ss')}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        backgroundColor: "black",
        
        
    },
    distance: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textStyle: {fontSize: 72, color: "#777"},
    row: {
        // flex: .4,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginBottom: 40
    }
})