import React, { useState, useContext } from "react";

import { Button, Text, Image, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions,StatusBar } from "react-native";

import CartHeader from "./Cardheader";
import Adress from "./Adress";
import Mapadress from "./MapAdrr";

import Drawer from 'react-native-draggable-view'


const DraggView = ({ navigation }) => {

    return (
        <Drawer
        initialDrawerSize={0.12}
        
        onRelease={()=> {console.log('gg')}}
        renderContainerView={() => <Adress navigation={navigation} />}
        renderDrawerView={() => (
            <Mapadress navigation={navigation} />)}

        renderInitDrawerView={() => (<View style={{
            backgroundColor: 'white',
            height: 90,
        }}>
            <StatusBar  hidden={true} />
            <CartHeader  />
        </View>)}
    />
    )




}


const styles = StyleSheet.create({

   

})

export default DraggView;


