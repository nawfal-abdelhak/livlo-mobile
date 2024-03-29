import 'react-native-gesture-handler';
import React, { useState, useEffect, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, TextInput, Text, ActivityIndicator , StyleSheet, View, Dimensions,ScrollView } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreenn from "./src/screens/HomeScreen";
import AdminContent from "./src/screens/AdminContent";
import {UserContentStackScreen,HomeStackScreen} from "./src/screens/HomeUser";
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './src/contexts/index';
import  DrawerContent  from './src/screens/DrawerContent';
// import RootStackScreen from './src/screens/Rootstack';
import PhoneScreen from "./src/screens/PhoneScreen";
import Intro from "./src/screens/Intro";
import adresse from "./src/screens/MapAdrr";
import Intro1 from "./src/screens/Intro1";
import LottieView from 'lottie-react-native';
import Dragg from "./src/screens/DraggView";

import Order from "./src/screens/Order";

import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// const image1 = require('./assets/29299-food-loading-animation.json');

const Stack = createStackNavigator();

const App = () => {
  const [_user, setUser] = useState();

  const [intro, setintro] = useState();
  const [intro1, setintro1] = useState();
  const [dragg, setdragg] = useState();

  const [isLoading, setloading] = useState(true);

  const [_order, setOrder] = useState({
    product:[],
    restaurant:''
  });
  

  useEffect(() => {
    
    // AsyncStorage.clear();
    setTimeout(async() => {


      AsyncStorage.getItem('intro').then((data) => {
         
        setintro(data);
       
      });

      AsyncStorage.getItem('intro1').then((data) => {
         
        setintro1(data);
       
      });

      AsyncStorage.getItem('dragg').then((data) => {
         
        setdragg(data);
       
      });


     

      AsyncStorage.getItem('user').then((data) => {

        setloading(false);
  
        console.log('qsqsfqsf'+isLoading )
  
        if (!data) return;
  
        let user = JSON.parse(data)
        setUser(user);
        console.log('App', _user);
      });
    }, 2500);
   
  }, []);


  if( isLoading ) {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <LottieView
          
          source={require('./assets/29299-food-loading-animation.json')}
          autoPlay loop
        />
        
        
        </View>
      );
    }

  
  return (

    <UserContext.Provider value={{ _user: _user, setUser: setUser,_order:_order,setOrder:setOrder,setintro:setintro,setintro1:setintro1,setdragg:setdragg }}>
      
      <NavigationContainer >
      
        
          {_user ?
            <>
              {
                _user.roles.includes('COURIER') ?
                  <Stack.Navigator headerMode='none'>
                    <Stack.Screen name="AdminContent" component={AdminContent} />
                    </Stack.Navigator>
                  
                  : _user.roles.includes('CLIENT') ?
                  
                   !dragg ?
                    <Stack.Navigator headerMode='none'>
                    <Stack.Screen name="Dragg" component={Dragg} />   
                    </Stack.Navigator>
                      :

                  <Drawer.Navigator initialRouteName="HomeScreen" drawerContent={props => <DrawerContent {...props} />}>
                  
                  <Drawer.Screen name="HomeScreen" component={HomeStackScreen} />
                  <Drawer.Screen name="Profile" component={UserContentStackScreen} />
                  <Drawer.Screen name="adresse" component={adresse} />
                  <Stack.Screen name="Order" component={Order} />
                  </Drawer.Navigator>
                  
                          
                  : null
               
               
                   
            
                     
                    
              }
            </>
            :
            <Stack.Navigator headerMode='none'>
              {!intro ?
               <Stack.Screen name="Intro" component={Intro} />
              : !intro1 ?
               <Stack.Screen name="Intro1" component={Intro1} />                
                :
                <>
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="Signup" component={Signup} />
              
                </>

            }
              
            </Stack.Navigator>   

            
                    
           
                
          }
       
      </NavigationContainer>
      <ModalPortal />
    </UserContext.Provider>
  );
}

export default App;
