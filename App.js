import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import * as Location from "expo-location";
import API_KEY from "./.env";

import DateTime from "./components/DateTime";
import WeatherScroll from "./components/WeatherScroll";

const img = require("./assets/beach.jpg");
export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchDataFromApi = async (latitude, longitude) => {
    if (latitude && longitude) {
      console.log(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      );

      await Promise.resolve();

      // fetch renvoie une promesse / on attend le résultat de la promesse
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      );

      // json() renvoie une promesse / on attend le résultat de la promesse
      // data variable avec let et non pas constante avec const pour ajouter des informations
      let data = await res.json();

      const res2 = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=3&appid=${API_KEY}`
      );

      const locationname = await res2.json();

      //console.log(data );
      console.log(locationname);

      // ajout des noms de villes (d'après valeur limit) à l'objet data
      // locationname[0] : informations sur la première ville
      data.country = locationname[0].country;
      data.city = locationname[0].local_names["fr"] ?? locationname[0].name;

      //console.log(data);

      setData(data);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <DateTime
          current={data.current}
          timezone={data.timezone}
          lat={data.lat}
          country={data.country}
          city={data.city}
          lon={data.lon}
        />
        <WeatherScroll weatherData={data.daily} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
