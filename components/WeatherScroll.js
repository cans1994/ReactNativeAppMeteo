import React from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";

const WeatherScroll = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <CurrentTempE1 />
    </ScrollView>
  );
};

const CurrentTempE1 = () => {
  const img = { uri: "http://openweathermap.org/img/wn/10d@2x.png" };
  return (
    <View>
      <Image source={img} style={styles.image} />
      <View>
        <Text>Mardi</Text>
        <Text>Soir - </Text>
        <Text>Jour - </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 0.4,
    backgroundColor: "#18181bcc",
    padding: 30,
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default WeatherScroll;
