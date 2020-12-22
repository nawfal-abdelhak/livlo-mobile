import React, { useContext } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { ImageBackground, TextInput, Text, Image, StyleSheet, View, Dimensions, RefreshControl,FlatList,ScrollView } from "react-native";
import { UserContext } from '../../src/contexts/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
const { height } = Dimensions.get('window');

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = ({ navigation }) => {
  const { _user, setUser } = useContext(UserContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const Mcdo = require('../../assets/Mcdo.png');
  const KFC = require('../../assets/KFC.png');
  const BurgerKing = require('../../assets/BurgerKing.png');
  const Pizza = require('../../assets/Pizza.png');
  const burger = require('../../assets/burger.png');
  const DATA = [
    {
      id: '1',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/Mcdoi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },
    {
      id: '2',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },
    {
      id: '3',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/Mcdoi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },
    {
      id: '4',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },
    {
      id: '5',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/Mcdoi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },
    {
      id: '6',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },

    {
      id: '7',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },
    {
      id: '8',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },
    {
      id: '9',
      name: 'Double cheese burger',
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price:'30.00 Mad'
    },
  ];


  return (
    <View >
      <Text style={styles.bigtitle} >
        Choose your favorite Restaurant
    </Text>

      <View style={styles.block}>
   
        <Avatar.Image
        
          source={Mcdo}
          size={60}
        />
        <Avatar.Image
          source={BurgerKing}
          size={60}
        />
        <Avatar.Image
          source={Pizza}
          size={60}
        />
        <Avatar.Image
        
          source={KFC}
          size={60}
        />
        
      </View>


      <Text style={styles.secondtitle}>
        New recipes ,Offers!
      </Text>


    {/* <FlatList 
        horizontal={true}
         showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={({item,indx}) =>{
          return ( 
            
          <View  style={[styles.text, (index % 2)?  styles.flat1 : styles.flat2]} >
            
           <Image  style={styles.image} source={item.image}  />
           <Text  style={styles.name}>{item.name}  </Text>

           <Text  style={styles.description}>{item.description} </Text>

           <Text  style={styles.price}>{item.price} </Text>
        
           <Image  style={styles.restaurant} source={item.restaurant}  />

           </View>
           
  ) 
          
        }
      }
          

     /> */}

<ScrollView
       showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

<FlatList 
        
        data={DATA}
        renderItem={({item,index}) =>{
          return ( 
            
          <View  style={[styles.text, (index % 2)?  styles.flat11 : styles.flat22]} >
            <View style={styles.group}>
            
            <Avatar.Image
             style={{marginRight:'5%',marginLeft:'3%'}}
        
           source={burger}
           size={60}
                />
                <View  style={styles.items}>
           <Text  style={styles.name1}>{item.name}  </Text>

           <Text  style={styles.description1}>{item.description} </Text>
           <View  style={{flexDirection:'row'}}>
           <Text  style={styles.price1}>{item.price} </Text>
           <Text  style={styles.quantity}>- 1 + </Text>
           

           </View>
        
           </View>

           </View>
           </View>
           
  ) 
          
        }
      }
          

     />

    </ScrollView>



    </View>

  )
};

const styles = StyleSheet.create({
  
  bigtitle: {
    fontSize: hp('4%'),

  },

  block: {
    marginTop: hp('2%'),
    height: hp('12%'),
    backgroundColor: '#F3A990',
    width: '100%',
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:'center'
     
  },

  secondtitle:{
    marginTop: hp('3%'),
    fontSize: hp('4%'),
    marginLeft:'3%'
  },
  flat1:{
    marginTop: hp('4%'),
    backgroundColor:'#DF5B73' ,
    borderRadius:15,
    marginLeft:10,
    marginRight:15,
    height: hp('40%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5 
  },

  flat2:{
    marginTop: hp('4%'),
    backgroundColor:'#F3A990' ,
    borderRadius:15,
    marginLeft:10,
    marginRight:15,
    height: hp('40%'),
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
    elevation: 5 
  },
   
  name:{
    
    marginTop: hp('4%'),
    marginLeft:10,
    fontSize: hp('3%'),
  },

  description:{
    fontSize: hp('2%'),
    marginLeft:10,
  },


  price:{
    marginLeft:100,
    fontSize: hp('4%'),
    marginBottom:-hp('4%'),
  },
  restaurant:{
    marginLeft:10,
  
  },



  // flatlist2

  flat11:{
    marginTop: hp('3%'),
    backgroundColor:'#F3A990' ,
    borderRadius:15,
    marginLeft:7,
    marginRight:7,
    height: hp('14%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5 
  },


  flat22:{
    marginTop: hp('3%'),
    backgroundColor:'#DF5B73' ,
    
    borderRadius:15,
    marginLeft:7,
    marginRight:7,
    height: hp('14%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5 ,
    
  },

  group:{
    flexDirection:'row',
    marginTop: hp('1.5%'),
    
  

  },

  items:{
    flexDirection:'column',
    

  },

  name1:{
    fontSize: hp('3%'),
  },

  description1:{

  },

  price1:{
    fontSize: hp('3%'),
    marginRight:'40%'
  },

  quantity:{
 marginTop:hp('1%'),
  }






  

});

export default HomeScreen;