import React, { useState, useContext } from "react";

import { Button, Text, Image, StyleSheet, View,ImageBackground,Dimensions } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const Eclipse = require('../../assets/Eclipse.png');
const locate = require('../../assets/locate.png');



const Cardheader = ({ navigation }) => {

    return (
        <LinearGradient
            colors={['#DF5B73', '#F3A78E']}
            style={styles.container}>

           <ImageBackground source={Eclipse} style={styles.image}>

               <Image source={locate} style={styles.locate}/>

               <Text style={styles.txt} >drag  to enter location</Text>

           </ImageBackground>

       </LinearGradient>



    )




}


const styles = StyleSheet.create({

    container: {
		flex: 1,
        flexDirection: "column",
       

	},
	image: {

		flex: 1,
		resizeMode: "cover",

    },
    locate:{
marginTop:10,
        alignSelf:'center'
    },
    txt:{
        alignSelf:'center',
        fontSize:hp('3%')
    }


})

export default Cardheader;


