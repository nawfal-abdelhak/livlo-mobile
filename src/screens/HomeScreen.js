import React, { useState, useContext } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, TextInput, Text, Image, Button, StyleSheet, View, Dimensions, RefreshControl, FlatList, ScrollView } from "react-native";
import { UserContext } from '../../src/contexts/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

  const [totalprice, settotalprice] = useState(0)
  const [DATA, setDATA] = useState([
    {
      id: '1',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/Mcdoi.png'),
      description: 'burger + fries meduim',
      price: 30,
      quantity: 0
    },
    {
      id: '2',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price: 40,
      quantity: 0
    },
    {
      id: '3',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/Mcdoi.png'),
      description: 'burger + fries meduim',
      price: 50,
      quantity: 0
    },
    {
      id: '4',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price: 30,
      quantity: 0
    },
    {
      id: '5',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/Mcdoi.png'),
      description: 'burger + fries meduim',
      price: 30,
      quantity: 0
    },
    {
      id: '6',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price: 30,
      quantity: 0
    },

    {
      id: '7',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price: 30,
      quantity: 0
    },
    {
      id: '8',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price: 30,
      quantity: 0
    },
    {
      id: '9',
      name: 'Double cheese burger',
      image: require('../../assets/Doublecheese.png'),
      restaurant: require('../../assets/BurgerKingi.png'),
      description: 'burger + fries meduim',
      price: 30,
      quantity: 0
    },
  ])

 const minusqua= (index)=>{
  for (let i=0;i<DATA.length ;i++){
    if(DATA[i].id==index+1 && DATA[i].quantity>0 ){
    console.log(DATA[i].quantity);
    DATA[i].quantity=DATA[i].quantity-1;
    settotalprice(totalprice-DATA[i].price)
    }

  }
}

  const addqua= (index)=>{
    for (let i=0;i<DATA.length ;i++){
      if(DATA[i].id==index+1){
      
      DATA[i].quantity=DATA[i].quantity+1;
      console.log(DATA[i]);
      settotalprice(totalprice+DATA[i].price)
      }
  
    }
  }

  
  

 



  return (
    <View >
      <Text style={styles.bigtitle} >
        Choose your favorite Restaurant
    </Text>
    
      <View style={styles.block}>
      <TouchableOpacity onPress={() =>navigation.navigate('Profile')}  >
        <Avatar.Image
          
          source={Mcdo}
          size={60}
        />
        </TouchableOpacity>
        <Avatar.Image 
        style={{opacity:0.1}}
          source={BurgerKing}
          size={60}
        />
        <Avatar.Image
          style={{opacity:0.1}}
          source={Pizza}
          size={60}
        />
        <Avatar.Image
          style={{opacity:0.1}}
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
          renderItem={({ item, index }) => {
            return (

              <View style={[styles.text, (index % 2) ? styles.flat11 : styles.flat22]} >
                <View style={styles.group}>

                  <Avatar.Image
                    style={{ marginRight: '5%', marginLeft: '3%' }}

                    source={burger}
                    size={60}
                  />
                  <View style={styles.items}>
                    <Text style={styles.name1}>{item.name}  </Text>

                    <Text style={styles.description1}>{item.description} </Text>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.price1}>{item.price}.00 Mad </Text>

                      <View style={styles.quantity}>

                      <TouchableOpacity  onPress={() => minusqua(index) }>
                        <Icon
                          name="minus-circle"
                           color={'white'}
                          size={25}
                        />
                        </TouchableOpacity >
                        <Text style={{fontSize:hp('3%')}} >  {item.quantity}  </Text>
                        <TouchableOpacity  onPress={() => addqua(index) }>
                        <Icon
                          name="plus-circle"
                          color={'white'}
                          size={25}
                        />
                        </TouchableOpacity>
                        
                      </View>

                    </View>

                  </View>

                </View>
              </View>

            )

          }
          }


        />





      </ScrollView>

      {totalprice>0?

      <View
        style={{
          position: 'absolute',//use absolute position to show button on top of the map
          top: '66%', //for center align
          alignSelf: 'center', //for align to right
          backgroundColor: '#DF5B73',
          width: wp('80%'),
          height: hp('6%'),
          borderRadius: 30,
          elevation:8,
          shadowOffset: { width: 5, height: 5 },
          shadowColor: "#4d4d4d",
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }}
      >
        <TouchableOpacity>
          <Text style={{
            
            fontSize: hp('2.5%'),
            color: 'white',
            alignSelf:'center',
            marginTop: hp('1%'),
          }} >commander pour {totalprice} MAD</Text>
        </TouchableOpacity>
      </View>
      :
      <View></View>
      }


    </View>

  )
};

const styles = StyleSheet.create({

  bigtitle: {
    fontSize: hp('4%'),
    marginTop: hp('1.5%'),
    marginLeft:hp('2%')

  },

  block: {
    marginTop: hp('2%'),
    height: hp('12%'),
    backgroundColor: '#F3A990',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'

  },

  secondtitle: {
    marginTop: hp('3%'),
    fontSize: hp('4%'),
    marginLeft: '3%'
  },
  flat1: {
    marginTop: hp('4%'),
    backgroundColor: '#DF5B73',
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 15,
    height: hp('40%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },

  flat2: {
    marginTop: hp('4%'),
    backgroundColor: '#F3A990',
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 15,
    height: hp('40%'),
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5
  },

  name: {

    marginTop: hp('4%'),
    marginLeft: 10,
    fontSize: hp('3%'),
  },

  description: {
    fontSize: hp('2%'),
    marginLeft: 10,
  },


  price: {
    marginLeft: 100,
    fontSize: hp('4%'),
    marginBottom: -hp('4%'),
  },
  restaurant: {
    marginLeft: 10,

  },



  // flatlist2

  flat11: {
    marginTop: hp('3%'),
    backgroundColor: '#F3A990',
    borderRadius: 15,
    marginLeft: 7,
    marginRight: 7,
    height: hp('14%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },


  flat22: {
    marginTop: hp('3%'),
    backgroundColor: '#DF5B73',

    borderRadius: 15,
    marginLeft: 7,
    marginRight: 7,
    height: hp('14%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,

  },

  group: {
    flexDirection: 'row',
    marginTop: hp('1.5%'),



  },

  items: {
    flexDirection: 'column',


  },

  name1: {
    fontSize: hp('3%'),
  },

  description1: {

  },

  price1: {
    fontSize: hp('3%'),
    marginRight: '25%'
  },

  quantity: {
    marginTop: hp('1%'),
    flexDirection: 'row'
  }








});

export default HomeScreen;
