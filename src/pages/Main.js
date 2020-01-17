import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

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

  return (

    <>
      <MapView
        style={styles.map}
        initialRegion={currentRegion}
      >
        <Marker
        coordinate={{
          longitude: -43.1844011,
          latitude: -22.91361
          }}
        >
        <Image
          source={{ uri: "https://avatars3.githubusercontent.com/u/9853010?v=4"}}
          style={styles.avatar}
        />
        <Callout onPress={() => {
          // navigate to Profile page
          navigation.navigate("Profile", { github_username: "marcusreaiche" });
        }}>
          <View style={styles.callout}>
            <Text style={styles.devName}>Marcus Reaiche</Text>
            <Text style={styles.devBio}>Applied Mathematician - Risk Analyst - Also interested in Web and Mobile Dev, and Data Visualization</Text>
            <Text style={styles.devTechs}>ReactJS, Node.js, Python</Text>
          </View>
        </Callout>
        </Marker>
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search devs by techs"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity
          onPress={() => {}}
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
