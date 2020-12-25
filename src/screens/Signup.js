import React, { useState } from "react";
import Springapi from '../../src/api/Springapi';
import { ImageBackground, TextInput, Text, Image, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-datepicker';
import { TouchableOpacity } from "react-native-gesture-handler";
const image = require('../../assets/loginPage.png');



const image1 = require('../../assets/Submit.png');

const { height } = Dimensions.get('window');

const Signin = () => {

    const [submit, setSubmit] = React.useState(false)

    const [data, setData] = React.useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        birthday: '"01-01-99"'

    });

    const errmessage = {
        err1: 'required',

    }

    const saveUser = (user) => {
        console.log(user)

        Springapi.post('api/auth/signup', {
            "username": user.first_name,
            "password": user.last_name,
            "email": user.phone_number,
            "birthday": user.birthday

        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });



    };

    const checkerr = () => {
        setSubmit(true);

    }

    return <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
            <Animatable.View animation="fadeInUpBig" >
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.signup}> Sign up </Text>
                    <View style={styles.view1}>

                        <Text style={styles.numberp}> First name</Text>
                        <View style={{ flexDirection: 'row' }}>

                            <TextInput
                                onChangeText={data1 => setData({
                                    ...data,
                                    first_name: data1
                                })}

                                style={styles.inputnumber}

                            />
                            {submit == true && data.first_name == '' ?
                                <Text style={{ color: 'red' }}> required *</Text>
                                : null
                            }
                        </View>

                    </View >

                    <View style={styles.view}>

                        <Text style={styles.numberp}> Last name</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput

                                onChangeText={data1 => setData({
                                    ...data,
                                    last_name: data1
                                })}
                                style={styles.inputnumber}

                            />

                            {submit == true && data.last_name == '' ?
                                <Text style={{ color: 'red' }}> required *</Text>
                                : null
                            }
                        </View>
                    </View>


                    <View style={styles.view}>
                        <Text style={styles.numberp}> Phone number</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                keyboardType="numeric"
                                onChangeText={data1 => setData({
                                    ...data,
                                    phone_number: data1
                                })}
                                style={styles.inputnumber}

                            />
                              { submit==true && data.phone_number=='' ?
                            <Text style={{ color: 'red' }}> required *</Text>
                            :null
                               }
                        </View>
                    </View>

                    <View style={styles.view}>

                        <Text style={styles.numberp}> Birthday</Text>

                        <View style={{ flexDirection: 'row' }}>
                            <DatePicker

                                style={styles.inputnumber}
                                // Initial date from state
                                mode="date" // The enum of date, datetime and time
                                //   placeholder="select date"
                                format="DD-MM-YY"
                                //   minDate="01-01-2016"
                                maxDate={new Date()}
                                date={data.birthday}
                                useNativeDriver={true}

                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none',


                                    },
                                    dateInput: {
                                        borderWidth: 0,
                                        color: 'white',

                                    },
                                    dateText: {
                                        left: -78,
                                        color: "white",
                                        marginBottom: hp('1.5%')
                                    }

                                }}
                                onDateChange={(date) => {
                                    setData({
                                        ...data,
                                        birthday: date
                                    })
                                }}
                            />
                            
                        </View>
                    </View>


                    <TouchableOpacity style={styles.image1view} onPress={() => checkerr()} >

                        <Image style={styles.image1} source={image1} />


                    </TouchableOpacity>

                    <View style={styles.viewtext}>
                        <Text style={styles.viewtext1} > Already sign up ? </Text>
                        <Text style={styles.viewtext2} onPress={() => saveUser(data)}  >Sign in</Text>
                    </View>
                </ScrollView>
            </Animatable.View>
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

        width: wp('60%'),
        height: hp('4%'),
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
