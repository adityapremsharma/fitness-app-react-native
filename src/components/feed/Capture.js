import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";

import {
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Capture({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setcamera] = useState(null);
  const [image, setimage] = useState(null);
  // const [recording, setRecording] = useState(false);

  useEffect(() => {
    //Camera
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setCameraPermission(status === "granted");
    })();

    //Gallery
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setGalleryPermission(status === "granted");
      }
    })();
  }, []);

  //Camera
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setimage(data.uri);
    }
  };

  //Gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.cancelled) {
      setimage(result.uri);
    }
  };

  if (cameraPermission === null || galleryPermission === null) {
    return <View />;
  }
  if (cameraPermission === false || galleryPermission === false) {
    return <Text>No access</Text>;
  }
  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          ref={(ref) => setcamera(ref)}
          style={styles.camera}
          type={type}
          ratio={"16:9"}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <MaterialIcons
                name="flip-camera-android"
                size={24}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={takePicture}>
              <View style={styles.circle}></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImage}>
              <FontAwesome5 name="photo-video" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate("Gallery")}>
            <Text style={styles.text}>Go to gallery</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={{ alignSelf: "center", justifyContent: "center" }}
            onPress={async () => {
              if (!recording) {
                setRecording(true);
                let video = await camera.recordAsync();
                console.log(video.uri);
              } else {
                setRecording(false);
                camera.stopRecording();
              }
            }}
          >
            <Text style={{ color: "white" }}>Record</Text>
          </TouchableOpacity> */}
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <Image style={{ flex: 1 }} source={{ uri: image }}></Image>
          <TouchableOpacity style={styles.cross} onPress={() => setimage(null)}>
            <Entypo name="cross" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.send}
            onPress={() => navigation.navigate("Save", { image })}
          >
            <FontAwesome name="check" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    width: "100%",
    height: "100%",
    // aspectRatio: 16/9
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  cross: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#e91e63",
    position: "absolute",
    bottom: 50,
    left: 50,
  },
  send: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#39FF14",
    position: "absolute",
    bottom: 50,
    right: 50,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  circle: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: "center",
  },
});
