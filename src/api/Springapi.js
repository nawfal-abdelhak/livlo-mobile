import axios from 'axios';

export default axios.create({
    baseURL:'http://192.168.1.3:8080',
    headers:{
        'Content-Type': 'application/json',
        
 
    }

});

