import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView, {Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import * as turf from '@turf/turf'

import Monitor from './Monitor'

export default class Run extends React.Component {
    map = React.createRef()

    state = {trackPosition: [], distance: 0, pace: 0}

    async componentDidMount() {
        this.listener = await Location.watchPositionAsync({accuracy: 4, timeInterval: 1000, distanceInterval: 1}, this.onPositionChange) 
    }
    
    componentWillUnmount() {
        this.listener.remove()
    }
            

    distanceBetween = (origin, destination) => {
        const from = turf.point([origin.coords.longitude, origin.coords.latitude]);
        const to = turf.point([destination.coords.longitude, destination.coords.latitude]);
        const options = {units: 'meters'};
        return Math.round(turf.distance(from, to, options));      
    }

    computePace(delta, lastPosition, position) {
        const time = (position.timestamp - lastPosition.timestamp) / 1000
        const pace = Math.round(delta / time)
        return pace
    }
    

    onPositionChange = (position) => {
        this.map.current.animateCamera(position.coords, 1000)
        // console.log(position)
        const {latitude, longitude} = this.props
        const lastPosition = this.state.trackPosition.length === 0 ? {coords: {latitude, longitude}} : this.state.trackPosition[this.state.trackPosition.length - 1]
        const delta = this.distanceBetween(lastPosition, position)

        this.setState({pace: this.computePace(delta, lastPosition, position)})
        this.setState({distance: this.state.distance + this.distanceBetween(lastPosition, position)})
        this.setState({trackPosition: [...this.state.trackPosition, position]})
    }
        
    render() {
        const {latitude, longitude} = this.props
        const {trackPosition, distance, pace
        } = this.state
        const currentPosition = trackPosition.length === 0 ? {coords: {latitude, longitude}} : trackPosition[trackPosition.length - 1]

    return (
    <View style={styles.container}>
    <Monitor {...{distance, pace}} />
      <MapView ref={this.map} style={styles.map} initialRegion={{latitude, longitude, latitudeDelta: 0.001, longitudeDelta: 0.01}}>
        <Marker coordinate={currentPosition.coords} />
          <Polyline coordinates={trackPosition.map(position => position.coords)} strokeWidth={10} strokeColor="#00FF00" />
      </MapView>
    </View>
    )
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    }
})


// import React, {useState, useEffect} from 'react'
// import { View, Text, StyleSheet, Dimensions } from 'react-native'
// import MapView, {Marker, Polyline} from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as turf from '@turf/turf'

// import Monitor from './Monitor'

// const Run = ({distance, latitude, longitude}) => {
//     // let listener;
//     const [getDistance, setGetDistance] = useState(0)
//     const [trackPosition, setTrackPosition] = useState([])

//     const getPositionChange = async () => {
//         listener = await Location.watchPositionAsync({accuracy: 4, timeInterval: 1000, distanceInterval: 1}, onPositionChange) 
//         console.log(1)
//     }
//     useEffect(() => {
        
//         getPositionChange()

//         return () => {
//             listener.remove()
//             console.log(2)
//         }
//     })

//     const distanceBetween = (origin, destination) => {
//         const from = turf.point([origin.coords.longitude, origin.coords.latitude]);
//         const to = turf.point([destination.coords.longitude, destination.coords.latitude]);
//         const options = {units: 'meters'};
//         console.log(3)
//         return turf.distance(from, to, options);
        
//     }
    

//     const onPositionChange = (position) => {
//         const lastPosition = trackPosition.length === 0 ? {coords: {latitude, longitude}} : trackPosition[trackPosition.length - 1]
//         setTrackPosition([...trackPosition, position])
        

//         // console.log(position.coords.latitude)
//         setGetDistance(getDistance + distanceBetween(lastPosition, position))
//         console.log(4)

//     }
//     // console.log(getDistance)

            
//     const currentPosition = trackPosition.length === 0 ? {coords: {latitude, longitude}} : trackPosition[trackPosition.length - 1]

//     return (
//     <View style={styles.container}>
//     <Monitor distance={distance} />
//       <MapView style={styles.map} initialRegion={{latitude, longitude, latitudeDelta: 0.001, longitudeDelta: 0.01}}>
//         <Marker coordinate={currentPosition.coords} />
//           <Polyline coordinates={trackPosition.map(position => position.coords)} strokeWidth={10} strokeColor="#00FF00" />
//       </MapView>
//     </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     map: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height,
//     }
// })

// export default Run