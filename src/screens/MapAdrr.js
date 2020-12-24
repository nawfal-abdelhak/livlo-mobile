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
  const [marker, setmarker] = useState(null);

  const [display, setdisplay] = useState(true);
  
 

  // useEffect(() => {

  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   let text1 = JSON.stringify(location);

   
    
    
  // }
   const saveLocation =() =>{
     console.log(marker)
   }



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

    onPress={(e) => setmarker( e.nativeEvent.coordinate )}>
{
      marker &&
      <Marker image={marker_img} draggable coordinate={marker} />
}
  


  
    
    </MapView>

   
  
  {
    display ?
    <View
        style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '10%', //for center align
            alignSelf: 'center' ,//for align to right
            backgroundColor:'#cccccc',
            height:150,
            width:300,
            borderRadius:20

        }}
    >
        <Text style={{
        fontSize: hp('2.5%'),
        marginBottom:hp('2.5%'),
        marginTop:hp('2.5%'),
        textAlign:'center'
    }}> just press anywhere to display marker to select ur position with it </Text>
        <Button  title="i got it" onPress={() => setdisplay(false)}/>
    </View>
    :
    <View
    style={{
        position: 'absolute',//use absolute position to show button on top of the map
        top: '50%', //for center align
        alignSelf: 'flex-end' //for align to right
    }}
>
    <Button  title="confirm location" onPress={() => saveLocation()}/>
</View>
}

   
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


