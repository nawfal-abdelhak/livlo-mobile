import React, { useState, useContext } from "react";

import { Button, Text, Image, StyleSheet, View, ScrollView, TouchableOpacity,Dimensions } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const Intro2 = require('../../assets/Intro2.png');



const win = Dimensions.get('window');

const ratio = win.width/363; 



const Intro1 = ({ navigation }) => {

    return (
        <LinearGradient
            colors={['#F3A78E', '#DF5B73']}
            style={styles.container}>

            <Image style={styles.Intro1_image} source={Intro2} />

            <View  style={styles.IntroView}>

            <Text style={styles.Introtext} > The courier will  </Text>
            <Text style={styles.Introtext} >  pick up your oreder</Text>
            <Text style={styles.Introtext} > and deliver it to</Text>
            <Text style={styles.Introtext} >  you in a few</Text>
            <Text style={styles.Introtext} > minutes .</Text>

            </View>

            <Button
                color="#F3A78E"
                borderRadius="10"
                title="Next"


            />

        </LinearGradient>



    )




}


const styles = StyleSheet.create({

    container: {
		flex: 1,
	},

    Intro1_image: {
        marginTop:hp('5%'),
        height:216 * ratio,
        width:win.width,
       

    },

    Introtext: {
        textAlign: 'center',
        fontSize: hp('5.5%'),
        color: 'white',
    },

    IntroView:{
        marginTop:hp('10%'),
        marginBottom: hp('7%'),


    },

})

export default Intro1;


