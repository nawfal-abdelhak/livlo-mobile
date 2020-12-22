import { ImageBackground, TextInput, Text, Image, StyleSheet, View, Dimensions,Button } from "react-native";
import React, { useState, useContext } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../src/contexts/index';

const UserContent = () => {
const {  setUser } = useContext(UserContext);
  
  const logout = () => {
    AsyncStorage.removeItem('user').then(() => {
      setUser(null);
      // navigation.navigate('Signin');
    });
  }
    
    return ( <View >
        <Text style={styles.container}>
        User content
        </Text>
        <Button
        onPress={() => logout()}
        title="Log out"
        color="#841584"
      />

        
    </View>
    )

};

const styles = StyleSheet.create({
 
    container: {
        marginTop: 50,
      },
});

export default UserContent;
