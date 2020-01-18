import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../services/api";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devByTechs, setDevsByTechs] = useState([]);
  const [techs, setTechs] = useState("");

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();
      if(granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const {latitude, longitude} = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        })
      }
    }
    loadInitialPosition();
  }, [])

  if(!currentRegion) {
    return null;
  }

  async function searchDevsByTech() {
    console.log("Pressed!")
    const { latitude, longitude } = currentRegion;
    console.log(latitude);
    console.log(longitude);
    console.log(techs);
    try {
      const response = await api.get("/search", {
        params: {
          latitude,
          longitude,
          techs
        }
      });
      setDevsByTechs(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleRegionChange(region) {
    setCurrentRegion(region);
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
        onRegionChangeComplete={handleRegionChange}
      >
        {devByTechs.map(dev => (
          <Marker
            key={String(dev._id)}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
              }}
          >
            <Image
              source={{ uri: dev.avatar_url }}
              style={styles.avatar}
            />
            <Callout onPress={() => {
              // navigate to Profile page
              navigation.navigate("Profile", { github_username: dev.github_username });
            }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(", ")}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search devs by techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={text => setTechs(text)}
        />
        <TouchableOpacity
          onPress={searchDevsByTech}
          style={styles.loadButton}
        >
          <MaterialIcons
            name="my-location"
            size={20}
           color="#fff"
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 4,
    borderColor: "#fff"
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: "bold",
    fontSize: 16
  },
  devBio: {
    color: "#666",
    marginTop: 5
  },
  devTechs: {
    marginTop: 5,
  },
  searchForm: {
    position: "absolute",
    zIndex: 5,
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  searchInput: {
    flex: 1,
    color: "#333",
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    fontSize: 16,
    height: 50,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    marginLeft: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8e4dff",
  }
})

export default Main;
