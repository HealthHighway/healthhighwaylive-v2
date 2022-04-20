import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';

const InfoTag = ({imageUrl, title, height, marginTop, marginRight, fontSize}) => {
    return(
        <View style={{flexDirection:'row', alignItems:"center", height:height?scale(height):scale(40), backgroundColor:"white",  marginTop:marginTop?scale(marginTop):scale(10), marginRight:marginRight?scale(marginRight):0}} >
            <View style={{width:scale(20), backgroundColor:'white', ...styles.rowCenter, height:'100%', justifyContent:'flex-start'}} >
                <Image source={imageUrl} resizeMode="contain" style={{height:'60%', width:'80%'}} />    
            </View>
            <Text allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Regular',fontSize:fontSize?scale(fontSize):scale(13), marginLeft:scale(5) }}>{title}</Text>
        </View>
    )
}

export default InfoTag;