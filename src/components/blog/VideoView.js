import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

export default function VideoView(props) {
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        source={{
          uri: props.route.params.uri,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        isBuffering
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  video: {
    flex: 1,
  },
});
