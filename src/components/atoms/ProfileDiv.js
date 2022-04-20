import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';

const ProfileDiv = ({onPress, title, imageUrl}) => {
    return(
        <TouchableOpacity onPress={onPress} activeOpacity={0.89} style={{height:scale(50),backgroundColor:'#EBF7FF', marginHorizontal:scale(30), marginBottom:scale(10), ...styles.shadowStyle, borderRadius:scale(10), alignItems:'center',flexDirection:'row'}} >
            <View style={{width:scale(60), alignItems:'center'}} >
                <Image source={imageUrl} resizeMode="contain" style={{height:'70%', width:'70%'}} />
            </View>
            <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(13), marginLeft:scale(10)}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ProfileDiv;