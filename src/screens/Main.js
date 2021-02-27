import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

import Run from '../components/Run'

export default function Main() {
  const [ready, setReady] = useState(false)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)

  const getLocation = async () => {
     let { status } = await Location.requestPermissionsAsync();
     if(status === "granted") {
      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync()
      setReady(true)
      setLatitude(latitude)
      setLongitude(longitude)
     } else {
       alert("Not Found")
     }
  }
  useEffect(() => {
    getLocation()
  }, [])

  if(!ready) {
    return <View style={styles.container}>
            <ActivityIndicator size="large" color="white" />
          </View>
  }
  return (
    <SafeAreaProvider>
      <Run distance={200} latitude={latitude} longitude={longitude} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29252b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});