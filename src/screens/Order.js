import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, TextInput, Text, Image, Button, StyleSheet, View, Dimensions, SafeAreaView, RefreshControl, FlatList, ScrollView } from "react-native";
import { UserContext } from '../../src/contexts/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from "@react-navigation/native";
import Springapi from '../../src/api/Springapi';



const Order = (props) => {
    const { _user, setUser, _order, setOrder } = useContext(UserContext);
    const isFocused = useIsFocused();
    const [produc, setProduc] = useState();
    const [restau, setRestau] = useState('');

    useEffect(() => {
       console.log(_user)

        setProduc(_order.products);
        setRestau(_order.restaurant)
        console.log(_order.products);
        console.log(_order.restaurant);
       



       


    }, [props, isFocused]);

    const  saveOrder =()=>{
        console.log(produc)


        let newData = produc.map(item => {return { ...item, product: {  id:item.id  } }});


        let newArray = newData.map(function(item) {      
            delete item.id; 
            delete item.description; 
            delete item.image; 
            delete item.name; 
            delete item.price; 
            return item; 
        });

        console.log(newArray)
        console.log( _user.user.id)
        let body = {
            "client": {
                "id":_user.user.id
            },
            
            "items": newArray 
        };
         Springapi.post('client/makeOrder', body, {
           headers: {      
             'Content-Type': 'application/json',
             'Authorization':'Bearer'+' '+_user.token,
           }
         })
           .then((response) => {
     
             console.log(response.data);
     
             
           })
           .catch(function (error) {
             console.log(error);
           });
    }



    return (
        <View >

            <View style={styles.Bigtitile}>
                <TouchableOpacity style={{ alignSelf: 'center', marginTop: '2%' }} onPress={() => { props.navigation.navigate('HomeScreen') }}>
                    <Icon
                   
                        name="keyboard-backspace"
                        color={'black'}
                        size={30}
                    />
                </TouchableOpacity>
                <Text style={styles.BigtitileText}>commander quelque chose </Text>
            </View>


          

                {/* <FlatList

                    keyExtractor={item => item.id.toString()}
                    data={produc}
                    renderItem={({ item }) =>
                    ( */}

                        <View>
                            <Text style={styles.title}>{restau}</Text>

                            <FlatList
                                keyExtractor={productsdata => productsdata.id.toString()}

                                data={produc}
                                renderItem={({ item: productsdata, index }) => (

                                    <View  >
                                        { productsdata.quantity ?
                                            <View style={styles.items} >
                                                <View style={{ flexDirection: 'row' }}>
                                                    <TouchableOpacity style={{ backgroundColor: '#F3A990', borderRadius: 50,height:hp('5%'), width:wp('10%'), }}>
                                                        <Text style={{ fontSize: hp('2.8%'), marginLeft: '3%',marginTop:"4%",alignSelf:"center" }} > {productsdata.quantity}x  </Text>
                                                    </TouchableOpacity>
                                                    <Text style={{ fontSize: hp('2.8%'), marginLeft: '2%',width:wp('45%') }} >{productsdata.name}   </Text>
                                                    <Text style={{ fontSize: hp('2.8%'), marginLeft: '10%' ,fontFamily: 'monospace'}}>{productsdata.price}.00 Mad </Text>
                                                </View>
                                                <Text style={{ fontSize: hp('2%'), marginLeft: '12%', marginTop: hp('0.2%'),width:wp('45%') ,fontFamily: 'monospace',color:"grey" }} >{productsdata.description}   </Text>
                                                <Text style={{
                                                    marginBottom: hp('1%'),
                                                    borderBottomColor: '#e6e6e6',
                                                    borderBottomWidth: 2,
                                                    width: '90%',
                                                    alignSelf: 'center',
                                                    marginTop: hp('-0.5%')
                                                }} ></Text>
                                            </View>


                                            : null}

                                    </View>

                                )
                                }

                            />

                        </View>

                    {/* )

                    }

                /> */}

                <Text style={styles.title}>Adreese de Livraison</Text>

                <TouchableOpacity  onPress={() => { props.navigation.navigate('adresse') }} style={{
                    flexDirection: 'row', borderBottomColor: '#e6e6e6',
                    borderBottomWidth: 2,
                    width: '90%',
                    alignSelf: 'center',
                    paddingBottom: 4,
                    marginBottom: hp('2%')
                }}>
                    <Icon
                     style={{marginTop:hp('-0.5%')}}
                        name="flag-variant-outline"
                        color={'grey'}
                        size={30}
                    />
                    <Text style={styles.adresstext}> {_user.user.adress}</Text>
                    <View  style={{ paddingRight:20 }}>
                    <Icon
                   
                        name="chevron-right"
                        color={'grey'}
                        size={30}
                    />
                    </View>
                </TouchableOpacity>

                <View>
                    <View style={{ flexDirection: 'row',marginBottom:hp('2%'),marginLeft:hp('3%') }}>
                        <Text style={{fontSize: hp('3%'),}}>Article</Text>
                        <Text style={{color:'grey',alignSelf:'flex-end'}}>- - - - - - - - - - - - - - - - - - - - - </Text>
                        <Text style={{fontSize: hp('3%'),}}>185.00 Mad</Text>
                    </View>


                     <View style={{ flexDirection: 'row',marginBottom:hp('2%'),marginLeft:hp('3%') }}>
                        <Text style={{fontSize: hp('3%'),}}>Livraison</Text>
                        <Text style={{color:'grey',alignSelf:'flex-end'}}>- - - - - - - - - - - - - - - - - - - - - </Text>
                        <Text style={{fontSize: hp('3%'),}}>7.00 Mad</Text>
                    </View>
                    <View style={{ flexDirection: 'row',marginBottom:hp('2%'),marginLeft:hp('3%') }}>
                        <Text style={{fontSize: hp('3%'),}}>Total</Text>
                        <Text style={{color:'grey',alignSelf:'flex-end'}}>- - - - - - - - - - - - - - - - - - - - - </Text>
                        <Text style={{fontSize: hp('3%'),}}>192.00 Mad</Text>
                    </View>


                </View>

        


           
            <TouchableOpacity onPress={()=> {saveOrder() }}  style={{
          position: 'absolute',//use absolute position to show button on top of the map
          top: hp('90%'), //for center align
          alignSelf: 'center', //for align to right
          backgroundColor: '#DF5B73',
          width: wp('80%'),
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
          }} >Comander</Text>
        </TouchableOpacity>

        </View>

    )
};

const styles = StyleSheet.create({

    Bigtitile: {
        height: hp('10%'),
        elevation: 8,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#4d4d4d",
        shadowOpacity: 0.5,
        shadowRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#F3A990',

    },
    BigtitileText: {
        alignSelf: 'center',
        fontSize: hp('3%'),
        marginLeft: hp('4%'),


    },
    title: {
        fontSize: hp('3.1%'),
        color: 'grey',
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 2,
        width: '90%',
        alignSelf: 'center',
        paddingBottom: 4,
        marginBottom: hp('1%'),
        fontFamily: 'monospace'

    },
    adresstext: {
        fontSize: hp('2.7%'),
        color: 'black',
        width:wp('78%')

    }








});

export default Order;
