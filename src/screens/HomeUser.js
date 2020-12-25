import React from 'react';
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const UserContent = createStackNavigator();



export const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#F2A38D',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title:'Overview',
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#F2A38D" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </HomeStack.Navigator>
    );
    
   export  const UserContentStackScreen = ({navigation}) => (
    <UserContent.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#F2A38D',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <UserContent.Screen name="Profile" component={Profile} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#F2A38D" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </UserContent.Navigator>
    )