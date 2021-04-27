import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import * as turf from "@turf/turf";
import BottomSheet from "react-native-simple-bottom-sheet";

import Monitor from "./Monitor";
import { Context as FitnessContext } from "../../context/FitnessContext";
import Slider from "./Slider";

export default class Map extends React.Component {
  map = React.createRef();

  state = { trackPosition: [] };
  static contextType = FitnessContext;

  async componentDidMount() {
    this.listener = await Location.watchPositionAsync(
      { accuracy: 4, timeInterval: 1000, distanceInterval: 1 },
      this.onPositionChange
    );
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  distanceBetween = (origin, destination) => {
    const from = turf.point([origin.coords.longitude, origin.coords.latitude]);
    const to = turf.point([
      destination.coords.longitude,
      destination.coords.latitude,
    ]);
    const options = { units: "meters" };
    return turf.distance(from, to, options);
  };

  computePace(delta, lastPosition, position) {
    const time = (position.timestamp - lastPosition.timestamp) / 1000;
    const pace = delta / time;

    return { pace, time };
  }

  onPositionChange = (position) => {
    this.map.current.animateCamera(position.coords, 1000);

    const { latitude, longitude } = this.props;
    const lastPosition =
      this.state.trackPosition.length === 0
        ? { coords: { latitude, longitude } }
        : this.state.trackPosition[this.state.trackPosition.length - 1];
    const delta = this.distanceBetween(lastPosition, position);

    const { pace, time } = this.computePace(delta, lastPosition, position);
    const { state, setDistance, setPace, setTime } = this.context;
    // this.setState({pace: this.computePace(delta, lastPosition, position)})
    state.start ? pace >= 0 && setPace(pace) : null;
    state.start ? time >= 0 && setTime(time) : null;

    // this.setState({distance: this.state.distance + this.distanceBetween(lastPosition, position)})
    state.start
      ? setDistance(
          state.distance + this.distanceBetween(lastPosition, position)
        )
      : null;
    this.setState({ trackPosition: [...this.state.trackPosition, position] });
  };

  render() {
    const { latitude, longitude } = this.props;
    const { trackPosition } = this.state;
    const currentPosition =
      trackPosition.length === 0
        ? { coords: { latitude, longitude } }
        : trackPosition[trackPosition.length - 1];
    const {
      state: { start },
    } = this.context;

    return (
      <View style={styles.container}>
        <Monitor />
        <MapView
          ref={this.map}
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={currentPosition.coords} />
          <Polyline
            coordinates={trackPosition.map((position) => position.coords)}
            strokeWidth={10}
            strokeColor={
              start ? "rgba(57, 255 ,20, .6)" : "rgba(233, 30, 99, .6)"
            }
          />
        </MapView>
        <BottomSheet
          isOpen={false}
          wrapperStyle={{ backgroundColor: "rgba(0, 0, 0, .8)" }}
          sliderMinHeight="30"
        >
          <Slider />
        </BottomSheet>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});

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
