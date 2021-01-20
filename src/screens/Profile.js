import { ImageBackground, TextInput, Text, Image, StyleSheet, View, Dimensions,Button } from "react-native";
import React, { useState, useContext } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../contexts/index';
import { Modal, ModalContent,SlideAnimation,ModalFooter, ModalButton, } from 'react-native-modals';
const Profile = ({ navigation }) => {
const {  setUser } = useContext(UserContext);
  
  const logout = () => {
    // AsyncStorage.removeItem('user').then(() => {
    //   setUser(null);
    //   // navigation.navigate('Signin');
    // });
navigation.navigate('HomeScreen')

  }

  const [state, setState] = React.useState({visible:false});
    
    return ( <View >
        <Text style={styles.container}>
        User content
        </Text>
        <Button
    title="Show Modal"
    onPress={() => {
      setState({ visible: true });
    }}
  />
  <Modal
    visible={state.visible}
    footer={
      <ModalFooter>
        <ModalButton
          text="CANCEL"
          onPress={() => {
            setState({ visible: false })
          }}
        />
        <ModalButton
          text="OK"
          onPress={() => {
            setState({ visible: false })
          }}
        />
      </ModalFooter>
    }
    modalAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    onTouchOutside={() => {
      setState({ visible: false });
    }}
  >

   

    <ModalContent>
      <View style={{height:100,width:250}}>
      <Text>more info about adresse</Text>

      <TextInput

							style={styles.inputnumber}
							placeholder="Rue/residence/num de appartement"

							onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}

						/>

      </View>
    </ModalContent>
  </Modal>

        
    </View>
    )

};

const styles = StyleSheet.create({
 
    container: {
        marginTop: 50,
      },

      inputnumber: {
        marginTop:20,
        color: "white",
        width: '100%',
        height: '50%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:10,
        padding:10
      },
});

export default Profile;
