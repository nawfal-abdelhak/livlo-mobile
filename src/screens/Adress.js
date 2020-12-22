import React, { useState, useContext } from "react";

import { Button, Text, Image, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const map = require('../../assets/map.png');
const arrow = require('../../assets/Arrow.png');


const win = Dimensions.get('window');

const ratio = win.width/309; 



const Adress = ({ navigation }) => {

    return (
        <LinearGradient
            colors={['#F3A78E', '#DF5B73']}
            style={styles.container}>

            <Image style={styles.Intro1_image} source={map} />

            <View  style={styles.IntroView}>

            <Text style={styles.Introtext} > Start by defining a </Text>
            <Text style={styles.Introtext} >  delivery adress</Text>
            

            </View>

           <View style={styles.viewarrow}>
            <Image style={styles.arrow} source={arrow} />
            </View>
            

        </LinearGradient>



    )




}


const styles = StyleSheet.create({

    container: {
		flex: 1,
	},

    Intro1_image: {
        
        height:261 * ratio,
        width:wp('100%'),

    },

    Introtext: {
        textAlign: 'center',
        fontSize: hp('5.5%'),
        
    },

    IntroView:{
        marginTop:hp('4%'),
       
    },

    arrow:{
        
    },
    viewarrow:{
        alignItems:'center'
    }

})

export default Adress;


