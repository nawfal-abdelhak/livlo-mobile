import React, { useState, useEffect, Fragment,useContext } from 'react';

import { Button, Text, Image, StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from "react-native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../src/contexts/index';

const Intro1 = require('../../assets/Intro1.png');

const win = Dimensions.get('window');

const ratio = win.width / 326;





const Intro = ({ navigation }) => {

    const { setintro } = useContext(UserContext);

    const [cc, setcc] = useState();
    // useEffect(() => {
    //     AsyncStorage.setItem('intro', true);
    
    
    // }, []);


    // useEffect(() => {
    //     AsyncStorage.setItem('intro', "true");
    
    
    // }, []);

    const goToIntro1=()=>{

        AsyncStorage.setItem('intro', "true");
        setintro("true")
        
        
    }

    return (
        <LinearGradient
            colors={['#F3A78E', '#DF5B73']}
            style={styles.container}>

            <Image style={styles.Intro1_image} source={Intro1} />

            <View style={styles.IntroView}>

                <Text style={styles.Introtext} > Order in any  </Text>
                <Text style={styles.Introtext} >  known restaurant</Text>
                <Text style={styles.Introtext} >  in your city .</Text>

            </View>

            <Button
                color="#F3A78E"
                borderRadius="10"
                title="Next"

                onPress={() => goToIntro1()}
            />

        </LinearGradient>



    )




}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    Intro1_image: {

        height: 270 * ratio,
        width: win.width,

    },

    Introtext: {
        textAlign: 'center',
        fontSize: hp('5.5%'),
        color: 'white',
    },

    IntroView: {
        marginTop: hp('10%'),
        marginBottom: hp('14%'),


    },

})

export default Intro;


