import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, TextInput, Text, Image, Button, StyleSheet, View, Dimensions, SafeAreaView, RefreshControl, FlatList, ScrollView } from "react-native";
import { UserContext } from '../../src/contexts/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Springapi from '../../src/api/Springapi';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = ({ navigation }) => {
  const { _user, setUser, _order, setOrder } = useContext(UserContext);

  useEffect(() => {
    console.log(_user);
    Springapi.get('products/allRestaurant', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + _user.token,
      }
    })
      .then((response) => {


        setData(response.data)

        //  console.log(data)

        //   let tt=data.filter(data => data.name == "Mcdo")
        // setFiltreddata(tt);

        // console.log(filtreddata[0])

      })
      .catch(function (error) {
        console.log(error);
      });



  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState();

  const [filtreddata, setFiltreddata] = useState();

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);

  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  const [DATA, setDATA] = useState([
    {
      id:1,
      name:'Double cheese Burger' ,
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/Mcdoi.png'), 
      description:'burger + fries meduim',
      price:30
    },
    {
      id:2,
      name:'Double cheese Burger' ,
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/BurgerKingi.png'), 
      description:'burger + fries meduim',
      price:40
    },
    {
      id:3,
      name:'Double cheese Burger' ,
      image:require('../../assets/Doublecheese.png'),
      restaurant:require('../../assets/BurgerKingi.png'), 
      description:'burger + fries meduim',
      price:50
    },

  ]);


  const Mcdo = require('../../assets/Mcdo.png');
  const KFC = require('../../assets/KFC.png');
  const BurgerKing = require('../../assets/BurgerKing.png');
  const PizzaHut = require('../../assets/Pizza.png');
  const burger = require('../../assets/burger.png');

  const [totalprice, settotalprice] = useState(0)
  const [screen, setScreen] = useState(true)


  const minusqua = (product) => {


    product.quantity ? product.quantity > 0 ? product.quantity-- && settotalprice(totalprice - product.price) : product.quantity = 0 : product.quantity = 0;
    console.log(product.price)


  }

  const addqua = (product) => {
    product.quantity ? product.quantity++ : product.quantity = 1;
    console.log(product.price)
    settotalprice(totalprice + product.price)

  }

  const orderCreate = () => {
    
    setOrder({
      products:filtreddata[0].products.filter(filtreddata => filtreddata.quantity),
      restaurant:filtreddata[0].name
    });
    navigation.navigate('Order')
  }

  const changeRest = (id) => {
  setScreen(false);
    switch (id) {
      case 0:
        settotalprice(0)
        setFiltreddata(data.filter(data => data.name == "Mcdo"));
        setOpa(0);
        break;
      case 1:
        settotalprice(0)
        setFiltreddata(data.filter(data => data.name == "BurgerKing"));
        setOpa(1);
        break;
      case 2:
        settotalprice(0)
        setFiltreddata(data.filter(data => data.name == "PizzaHut"));
        setOpa(2);
        break;
      case 3:
        settotalprice(0)
        setFiltreddata(data.filter(data => data.name == "KFC"));
        setOpa(3);
        break;


      default:

    }

  }

  const [opa, setOpa] = useState()








  return (
    <View >
      <Text style={styles.bigtitle} >
        Choose your favorite Restaurant
    </Text>

      <View style={styles.block}>
        <TouchableOpacity onPress={() => changeRest(0)}  >
          <Avatar.Image
            style={[styles.text, (opa == 0) ? styles.opaci : styles.lowopaci]}
            source={Mcdo}
            size={60}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeRest(1)}  >
          <Avatar.Image
            style={[styles.text, (opa == 1) ? styles.opaci : styles.lowopaci]}
            source={BurgerKing}
            size={60}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changeRest(2)}  >
          <Avatar.Image
            style={[styles.text, (opa == 2) ? styles.opaci : styles.lowopaci]}
            source={PizzaHut}
            size={60}
          />
        </TouchableOpacity>


        <TouchableOpacity onPress={() => changeRest(3)}  >
          <Avatar.Image
            style={[styles.text, (opa == 3) ? styles.opaci : styles.lowopaci]}
            source={KFC}
            size={60}
          />
        </TouchableOpacity>

      </View>
      {
        screen ?
       
      <View>
        

        <Text style={styles.secondtitle}>
          New recipes ,Offers!
      </Text>


        <FlatList
        keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={({ item, index }) => {
            return (

              <View style={[styles.text, (index % 2) ? styles.flat1 : styles.flat2]} >

                <Image style={styles.image} source={item.image} />
                <Text style={styles.name}>{item.name}  </Text>

                <Text style={styles.description}>{item.description} </Text>

                <Text style={styles.price}>{item.price}.00 MAD </Text>

                <Image style={styles.restaurant} source={item.restaurant} />

              </View>

            )

          }
          }


        />

      </View>

      /* <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */
        :

      <FlatList
        style={{ marginBottom: hp('6%') }}
        keyExtractor={item => item.id.toString()}
        data={filtreddata}
        renderItem={({ item }) =>
        (


          <FlatList
            keyExtractor={productsdata => productsdata.id.toString()}
            style={{ marginBottom: '58%' }}
            data={item.products}
            renderItem={({ item: productsdata, index }) => (
              <View style={[styles.text, (index % 2) ? styles.flat11 : styles.flat22]} >
                <View style={styles.group}>


                  <Avatar.Image
                    style={{ marginRight: '5%', marginLeft: '3%' }}

                    source={burger}
                    size={60}
                  />

                  <View style={styles.items}>

                    <Text style={styles.name1}>{productsdata.name}   </Text>

                    <Text style={styles.description1}>{productsdata.description}   </Text>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.price1}>{productsdata.price}.00 Mad </Text>


                      <View style={styles.quantity}>

                        <TouchableOpacity onPress={() => minusqua(productsdata)}>
                          <Icon
                            name="minus-circle"
                            color={'white'}
                            size={25}
                          />
                        </TouchableOpacity >
                        {/* {productsdata.quantity}  */}
                        {
                          productsdata.quantity ?
                            <Text style={{ fontSize: hp('3%') }} > {productsdata.quantity} </Text>
                            :

                            <Text style={{ fontSize: hp('3%') }} > 0 </Text>

                        }
                        <TouchableOpacity onPress={() => addqua(productsdata)}>
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
            )}

          />





        )


        }


      />

    }





      {/* </ScrollView> */}

      {totalprice > 0 ?


        <TouchableOpacity onPress={() => orderCreate()} style={{
          position: 'absolute',//use absolute position to show button on top of the map
          top: '70%', //for center align
          alignSelf: 'center', //for align to right
          backgroundColor: '#DF5B73',
          width: wp('90%'),
          height: hp('6%'),
          borderRadius: 30,
          elevation: 8,
          shadowOffset: { width: 5, height: 5 },
          shadowColor: "#4d4d4d",
          shadowOpacity: 0.5,
          shadowRadius: 10,
        }}>
          <Text style={{

            fontSize: hp('2.5%'),
            color: 'white',
            alignSelf: 'center',
            marginTop: hp('1%'),
          }} >commander pour {totalprice} MAD</Text>
        </TouchableOpacity>

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
    marginLeft: hp('2%')

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
  },

  opaci: {
    opacity: 1
  },

  lowopaci: {
    opacity: 0.1
  },








});

export default HomeScreen;
