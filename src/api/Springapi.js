import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';



export default axios.create({
    baseURL:'http://192.168.1.8:8080/',
    
});

