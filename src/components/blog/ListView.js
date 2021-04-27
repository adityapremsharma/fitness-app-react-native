import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";

export default function ListView({ heading, search, data, navigation }) {
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (search === "") {
      setDisplayData(data);
    } else {
      const filteredData = data.filter((ele) => {
        return ele.name.toLowerCase().includes(search.toLowerCase());
      });
      setDisplayData(filteredData);
    }
  }, [search]);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <View style={styles.imageContainer}>
        {displayData.length ? (
          <FlatList
            keyboardShouldPersistTaps="always"
            nestedScrollEnabled={true}
            data={displayData}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => {
              return (
                <View key={item.name}>
                  <TouchableOpacity
                    onPress={() => {
                      Keyboard.dismiss();
                      navigation.navigate(item.page, { uri: item.url });
                    }}
                  >
                    <Image
                      style={styles.img}
                      source={{
                        uri: item.img,
                      }}
                    />
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.indicatorContainer}>
            <Text style={styles.indicator}>Nothing to show</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  heading: {
    color: "white",
    fontSize: 20,
    left: 25,
    textTransform: "uppercase",
  },
  img: {
    width: 150,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  imageContainer: {
    padding: 15,
  },
  text: {
    color: "white",
    alignSelf: "center",
  },
  indicatorContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    color: "rgba(255, 255, 255, 0.5)",
  },
});
