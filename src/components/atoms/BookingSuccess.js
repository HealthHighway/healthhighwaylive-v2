import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import styles from '../../styles/styles'
import { scale } from '../../theme/metric'

const BookingSuccess = (props) => {
    return (
        <View style={{position:'absolute', top:0, left:0, right:0, bottom:0, ...styles.rowCenter, zIndex:1000}} >
            <View style={{position:'absolute', top:0, left:0, right:0, bottom:0, backgroundColor:'gray', opacity:0.2}} />
            <View style={{width:"80%", height:scale(250), backgroundColor:"#fff", borderRadius:scale(10), alignItems:'center', justifyContent:'center'}} >
                <View style={{width:scale(50), height:scale(50)}} >
                    <Image source={require("../../assets/images/booking-check.png")} resizeMode="contain" style={{height:'100%', width:'100%'}} />
                </View>
                <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Bold',marginTop:scale(20), fontSize:scale(11)}}>Thank You for Purchasing</Text>
                <Text allowFontScaling={false} style={{color:'#939393',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(10), textAlign:'center', paddingHorizontal:scale(20)}}>Your purchage is added to your booking section. You can access all about booking from there.</Text>
                <View style={{width:"100%", height:scale(1), backgroundColor:"#E0E0E0", marginTop:scale(30)}} />
                <TouchableOpacity 
                    onPress={() => props.onPress()}
                    style={{marginTop:scale(15)}} >
                    <Text allowFontScaling={false} style={{color:'#F03F3F',fontFamily:'Montserrat-SemiBold', fontSize:scale(12)}}>Okay!</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BookingSuccess