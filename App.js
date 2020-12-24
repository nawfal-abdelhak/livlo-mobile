import 'react-native-gesture-handler';
import React, { useState, useEffect, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, TextInput, Text, ActivityIndicator , StyleSheet, View, Dimensions,ScrollView } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreenn from "./src/screens/HomeScreen";
import AdminContent from "./src/screens/AdminContent";
import {UserContentStackScreen,HomeStackScreen} from "./src/screens/HomeUser";
import UserContent from "./src/screens/UserContent";
import { UserContext } from './src/contexts/index';
import  DrawerContent  from './src/screens/DrawerContent';
// import RootStackScreen from './src/screens/Rootstack';
import PhoneScreen from "./src/screens/PhoneScreen";
import Intro from "./src/screens/Intro";
import Intro1 from "./src/screens/Intro1";
import LottieView from 'lottie-react-native';
import Dragg from "./src/screens/DraggView";



import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

// const image1 = require('./assets/29299-food-loading-animation.json');

const Stack = createStackNavigator();

const App = () => {
  const [_user, setUser] = useState();

  const [isLoading, setloading] = useState(true);
  

  useEffect(() => {

    setTimeout(async() => {
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
    <UserContext.Provider value={{ _user: _user, setUser: setUser }}>
      <NavigationContainer >
        
          {_user ?
            <>
              {
                _user.roles.includes('ROLE_ADMIN') ?
                  <Stack.Navigator headerMode='none'>
                    <Stack.Screen name="AdminContent" component={AdminContent} />
                    </Stack.Navigator>
                  
                  : _user.roles.includes('ROLE_USER') ?
                    
                      /* <Stack.Screen name="UserContent" component={UserContent} /> */
                      
                      <Drawer.Navigator initialRouteName="HomeScreen" drawerContent={props => <DrawerContent {...props} />}>
                        {/* <Drawer.Screen name="PhoneScreen" component={PhoneScreen} /> */}
                        <Drawer.Screen name="HomeScreen" component={HomeStackScreen} />
                        <Drawer.Screen name="UserContent" component={UserContent} />
                      </Drawer.Navigator>
                    
                    :
                    
                      /* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */
                      <Stack.Navigator headerMode='none'>
                      <Stack.Screen name="ModContent" component={ModContent} />
                      </Stack.Navigator>
                    
              }
            </>
            :

            
           
            <Stack.Navigator headerMode='none'>
              
              <Stack.Screen name="HomeScreenn" component={HomeScreenn} />
               <Stack.Screen name="Dragg" component={Dragg} />
              <Stack.Screen name="Signin" component={Signin} />
              <Stack.Screen name="Intro" component={Intro} />
              <Stack.Screen name="Intro1" component={Intro1} />                     
              <Stack.Screen name="Signup" component={Signup} />
              </Stack.Navigator>        
          }
       
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
