import React from 'react'
import {View, Text, Image, Linking} from 'react-native'
import { scale } from '../../theme/metric'
import BtnWithoutImage from './BtnWithoutImage'

const NoSessionBooked = (props) => {
    return (
        <View style={{flex:1, justifyContent:"center", alignItems:"center"}} >
            <View style={{height:scale(50), width:scale(50), backgroundColor :"transparent", justifyContent:'center', alignItems: 'center', marginTop:scale(10)}} >
                <Image source={require("../../assets/images/sad.png")} resizeMode="contain" />
            </View>
            <Text allowFontScaling={false} style={{color:'#474747',fontFamily:'Montserrat-Medium',fontSize:scale(13), marginTop : scale(13)}}>You haven’t booked a session yet :( </Text>
            <View style={{ width : scale(160), height:scale(40), backgroundColor:'white', borderRadius:scale(30), marginTop : scale(18), overflow:'hidden' }} >
                <BtnWithoutImage 
                    onPress = {() => props.onPress()}
                    title="Book a session now"
                    fontSize="12"
                />
            </View>
        </View>
    )
}

export default NoSessionBooked