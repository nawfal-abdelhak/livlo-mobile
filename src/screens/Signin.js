import React, { useState, useContext } from "react";
import Springapi from '../../src/api/Springapi';
import { ImageBackground, TextInput, Button, Text, Image, StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Platform } from "react-native";


import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../src/contexts/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

const image = require('../../assets/loginPage.png');

const image1 = require('../../assets/Submit.png');

const password = require('../../assets/password.png');



const { height } = Dimensions.get('window');

import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';


import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';



// Initialize Firebase JS SDK
// https://firebase.google.com/docs/web/setup
try {
	firebase.initializeApp({
		apiKey: "AIzaSyCZwfhjlk69Wo2EKzxefWsbz0owPSxqZ6w",
		authDomain: "phoneauth-25503.firebaseapp.com",
		projectId: "phoneauth-25503",
		storageBucket: "phoneauth-25503.appspot.com",
		messagingSenderId: "74561466194",
		appId: "1:74561466194:android:f2e95c9ac9846f0b23548b",
		measurementId: "G-E620TVMGR8"
	});
} catch (err) {
	// ignore app already initialized error in snack
}





const CELL_COUNT = 6;


const Signin = ({ navigation }) => {



	const [screen, setScreen] = React.useState(true);


	const [value, setValue] = React.useState('');
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const recaptchaVerifier = React.useRef(null);
	const [phoneNumber, setPhoneNumber] = React.useState();
	const [verificationId, setVerificationId] = React.useState();

	const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
	const [message, showMessage] = React.useState(
		!firebaseConfig || Platform.OS === 'web'
			? {
				text:
					'To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.',
			}
			: undefined
	);
	const attemptInvisibleVerification = false;

	///////////////////////////////////////////////////////////

	const { setUser } = useContext(UserContext);

	const [data, setData] = React.useState({
		username: '',
		password: '',
	});

	const test = () => {

		console.log('qsd')
		setScreen(false);
	}

	const saveUser = (user) => {
		console.log(user)

		Springapi.post('api/auth/signin', {
			"username": user.username,
			"password": user.password,
		})
			.then((response) => {
				let user = response.data;
				AsyncStorage.setItem('user', JSON.stringify(user));
				setUser(user);
			})
			.catch(function (error) {
				console.log(error);
			});
	};


	return <View style={styles.container} >


		{screen ?

			<ImageBackground source={image} style={styles.image}>

				<FirebaseRecaptchaVerifierModal
					ref={recaptchaVerifier}
					firebaseConfig={firebaseConfig}
					attemptInvisibleVerification={attemptInvisibleVerification}
				/>

				<ScrollView style={styles.scrollView}>


					<Text style={styles.signup}> Sign in </Text>

					<View style={styles.view1}>



						<Text style={styles.numberp}> number</Text>

						<TextInput

							style={styles.inputnumber}
							placeholder="+212 999 999 9999"
							autoFocus
							autoCompleteType="tel"
							keyboardType="phone-pad"
							textContentType="telephoneNumber"
							onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
						// onChangeText={data1 => setData({
						// 	...data,
						// 	username: data1
						// })}
						/>
					</View >

					{/* <View style={styles.view}>
							<Text style={styles.numberp}> password</Text>

							<TextInput

								style={styles.inputnumber}

								onChangeText={data1 => setData({
									...data,
									password: data1
								})}
							/>
						</View> */}




					{/* <TouchableOpacity style={styles.image1view} onPress={() => saveUser(data)}>
							<Image style={styles.image1} source={image1} />
						</TouchableOpacity> */}


					<View style={styles.viewtext}>
						<Text style={styles.viewtext1} > not signin ? </Text>
						<Text onPress={() => navigation.navigate('Signup')} style={styles.viewtext2} >Sign up</Text>
					</View>

					<Button title="nav" onPress={async () => {
						// The FirebaseRecaptchaVerifierModal ref implements the
						// FirebaseAuthApplicationVerifier interface and can be
						// passed directly to `verifyPhoneNumber`.

						try {
							const phoneProvider = new firebase.auth.PhoneAuthProvider();
							const verificationId = await phoneProvider.verifyPhoneNumber(
								phoneNumber,
								recaptchaVerifier.current
							);
							setVerificationId(verificationId);
							setScreen(false);
							// showMessage({
							// 	text: 'Verification code has been sent to your phone.',
							// });
						} catch (err) {
							showMessage({ text: `Error: ${err.message}`, color: 'red' });
						}
					}} />

				</ScrollView>



			</ImageBackground>





			:

			<LinearGradient
				colors={['#F3A78E', '#DF5B73']}
				style={styles.screen2}>
<ScrollView style={styles.scrollView}   showsVerticalScrollIndicator={false}>
				<View style={{ padding: 20, marginTop: 15 }}>
					<Image style={styles.pass_image} source={password} />

					<Text style={styles.textverif} onPress={() => { setScreen(true) }} > please enter  </Text>
					<Text style={styles.textverif} onPress={() => { setScreen(true) }} > the verfication code </Text>




					



						<CodeField
							ref={ref}
							{...props}
							value={value}
							onChangeText={setValue}
							cellCount={CELL_COUNT}
							rootStyle={styles.codeFieldRoot}
							keyboardType="number-pad"
							textContentType="oneTimeCode"
							renderCell={({ index, symbol, isFocused }) => (
								<Text
									key={index}
									style={[styles.cell, isFocused && styles.focusCell]}
									onLayout={getCellOnLayoutHandler(index)}>
									{symbol || (isFocused ? <Cursor /> : null)}
								</Text>
							)}
						/>
                          <View style={styles.containView}>
						<Text  style={styles.text1}>Didn't recieve code ? </Text>
						<Text  style={styles.text2}>Request again </Text>
						</View>
						


						<Button
						 color="#F3A78E"
						 borderRadius="10"
							title="Confirm Verification Code"
							// disabled={!verificationId}
							style={styles.buttonVerif}
							onPress={async () => {
								try {
									const credential = firebase.auth.PhoneAuthProvider.credential(
										verificationId,
										value
									);
									await firebase.auth().signInWithCredential(credential);
									showMessage({ text: 'Phone authentication successful 👍' });
								} catch (err) {
									showMessage({ text: `Error: ${err.message}`, color: 'red' });
								}
							}}
						/>
						{message ? (
							<TouchableOpacity
								style={[
									StyleSheet.absoluteFill,
									{ backgroundColor: '#DF5B73', left: '20%', top: '70%', borderRadius: 15, justifyContent: 'center', alignItems: 'center', width: '60%', height: '30%' },

								]}
								onPress={() => showMessage(undefined)}>
								<Text
									style={{
										color: message.color || 'blue',
										fontSize: 17,
										textAlign: 'center',
										margin: 20,
									}}>
									{message.text}
								</Text>
							</TouchableOpacity>
						) : (
								undefined
							)}
						{attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
					
				</View>
				</ScrollView>
			</LinearGradient>
			

		}
	</View>




};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",

	},
	image: {

		flex: 1,
		resizeMode: "cover",

	},
	keyboard: {

	},
	scrollView: {

		marginVertical: hp('2%'),
	},

	view1: {
		marginTop: height * 0.02,
		marginLeft: '5%',

	},

	view: {

		marginLeft: '5%',

	},



	signup: {
		color: "white",
		marginTop: height * 0.45,
		marginLeft: '2%',
		fontSize: hp('5%'),

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
		alignSelf: 'center',
		marginTop: height * 0.03,
		marginRight: '2%',
		width: wp('20%'),
	},

	image1: {




	},

	viewtext: {
		flexDirection: "row",
		justifyContent: 'center',
		marginTop: height * 0.04,






	},

	viewtext1: {
		color: "white",
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		fontSize: hp('2.2%'),

	},
	viewtext2: {
		color: "#F3A78E",
		fontSize: 15,
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		fontSize: hp('2.2%'),
	},


	root: { flex: 1, padding: 20 },
	title: { textAlign: 'center', fontSize: 30 },
	codeFieldRoot: { marginTop: 20 },
	cell: {
		backgroundColor: 'white',
		width: 40,
		height: 40,
		lineHeight: 38,
		fontSize: 24,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: '#00000030',
		textAlign: 'center',
	},
	focusCell: {
		borderColor: '#000',
	},

	screen2: {
		flex: 1,
	},

	pass_image: {

		width: wp('90%'),
		height: hp('37%'),

	},

	textverif: {
		textAlign: 'center',
		fontSize: hp('4%'),
	},

	containView:{
		marginTop: hp('9%'),
	 flexDirection:'row',
	 justifyContent: 'center',
		alignItems: 'stretch',
		marginBottom: hp('14%'),

	},

	text1:{
  color:'white',
  fontSize: hp('2.4%'),
  
  
	},
	text2:{
   color:'#F3A78E',
   fontSize: hp('2.4%'),
   
	},

	buttonVerif:{
		borderRadius:10,
		
		
	}







});

export default Signin;
