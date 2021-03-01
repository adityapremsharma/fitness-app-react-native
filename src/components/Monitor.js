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
            <Text style={styles.textStyle}>{distance}<Text style={{fontSize: 36}}> m</Text></Text>
            </View>
            <View style={styles.row}>
                <View>
                <View style={{marginLeft: 10, marginBottom: 5}}>
                    <FontAwesome5 name="running" size={24} color="#e91e63" />
                    </View>
                    <Text style={{color: "#777"}}>{pace >= 0 ? pace : 0} m/s</Text>
                </View>
                <View>
                <View style={{marginLeft: 5, marginBottom: 5}}>
                    <Ionicons name="time" size={24} color="#e91e63" />
                    </View>
                    <Text style={{color: "#777"}}>{TimeFormat.fromS(duration, 'mm:ss')}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.8,
        backgroundColor: "black",
        
        
    },
    distance: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 50
    },
    textStyle: {fontSize: 72, color: "#777"},
    row: {
        // flex: .4,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 30,
        marginBottom: 30
    }
})