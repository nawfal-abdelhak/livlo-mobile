import React, { useState } from "react";
import Springapi from '../../src/api/Springapi';
import { ImageBackground, TextInput, Text, Image, StyleSheet, View, Dimensions,ScrollView } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import DatePicker from 'react-native-datepicker';
const image = require('../../assets/loginPage.png');



const image1 = require('../../assets/Submit.png');

const { height } = Dimensions.get('window');

const Signin = () => {
    const [date, setDate] = useState('09-10-2020');
    const [data, setData] = React.useState({
        username:'',
        password: '',
        email: '',
        
    });

    const saveUser =(user)=>{
        console.log(user)

        Springapi.post('api/auth/signup',{
            "username": user.username,
            "password": user.password,
            "email":user.email
            
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

       

    };

    return <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
        <ScrollView style={styles.scrollView}>
            <Text style={styles.signup}> Sign up </Text>
            <View style={styles.view1}>

                <Text style={styles.numberp}> name</Text>

                <TextInput
                    onChangeText={data1 => setData({
                        ...data,
                        username: data1
                    })}

                    style={styles.inputnumber}



                />
            </View >

            <View style={styles.view}>
           
                <Text style={styles.numberp}> password</Text>

                <TextInput

                    onChangeText={data1 => setData({
                        ...data,
                        password: data1
                    })}
                    style={styles.inputnumber}



                />
            </View>
            <View style={styles.view}>
                <Text style={styles.numberp}> email</Text>

                <TextInput
                       onChangeText={data1 => setData({...data,
                        email: data1})}
                    style={styles.inputnumber}

                />
            </View>

            <View style={styles.view}>
           
                <Text style={styles.numberp}> birthday</Text>

              
                <DatePicker
                
          style={styles.inputnumber}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD/MM/YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
          useNativeDriver="false"
        
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              display: 'none',
             
              
            },
            dateInput: {
                borderWidth:0,
                color:'white',
                
              },
              dateText:{
                  left:-70,
                  color:"white",
                  marginBottom:hp('1.5%')
              }
            
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
            </View>



            <View style={styles.image1view}>
                <Image  style={styles.image1} source={image1} />
                
            </View>

            <View style={styles.viewtext}>
                <Text style={styles.viewtext1} > Already sign up ? </Text>
                <Text style={styles.viewtext2} onPress={() => saveUser(data) }  >Sign in</Text>
            </View>
            </ScrollView>
        </ImageBackground>
    </View>


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",

    },

    view1: {
        marginTop: height * 0.02,
        marginLeft: '5%',

    },

    view: {

        marginLeft: '5%',

    },
    scrollView: {
		
		marginVertical: hp('1%'),
	  },



    signup: {
        color: "white",
        marginTop: height * 0.45,

        marginLeft: '2%',
        fontSize: 36,

    },
    numberp: {
        color: "white",

        fontSize: hp('2.5%'),

    },

    inputnumber: {
        color: "white",

        width:wp('60%') ,
		height:hp('4%'),
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    image1view: {
        alignSelf: 'flex-end',
        marginTop: height * 0.01,
        marginRight: '2%'
    },

    image1: {




    },

    viewtext: {
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: -(height * 0.03),
        fontSize: hp('2.5%'),



    },

    viewtext1: {
        color: "white",
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    viewtext2: {
        color: "#F3A78E",
        fontSize: 15,
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },







});

export default Signin;
