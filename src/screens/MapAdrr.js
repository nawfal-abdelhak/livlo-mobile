import React, { useState, useContext,useEffect } from "react";

import { Button, Text, Image, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import MapView,{Marker}from 'react-native-maps';

import * as Location from 'expo-location';

const marker_img = require('../../assets/locate1.png');

const MapAdrr = ({ navigation }) => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [map, setmap] = useState(null);
  
 

  // useEffect(() => {

  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   let text1 = JSON.stringify(location);

   
    
    
  // }

  const getloc= () =>{
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      map.animateToCoordinate({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      2000
      )

      console.log(location)
    })();

  }

  return (
    <View style={styles.container}>
      <MapView

       ref={map => { setmap(map) }}
      style={styles.map}
    initialRegion={{
      latitude: 33.995176,
      longitude: -6.848536,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      
    }}

    onMapReady={getloc}
  >

<Marker style={styles.marker} coordinate={{ latitude : 33.995176 , longitude : -6.848536 }}
   image={marker_img} 
/>
  
    
    </MapView>

   
    </View>
  );


}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:80
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      marker:{
       
      }
})

export default MapAdrr;


