import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, ActivityIndicator, Dimensions} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';

const BtnWithoutImage = ({onPress, title, backgroundColor, textColor, fontFamily, fontSize, disabled}) => {
    return(
        <TouchableNativeFeedback disabled={disabled?disabled:false} onPress={() => onPress()}
            style={{overflow:'hidden'}}>
            <View style={{backgroundColor: backgroundColor?backgroundColor:'#4ca9ee', width:"100%", height:"100%",...styles.rowCenter, textAlign:'center', paddingHorizontal:scale(10)}}> 
                <Text allowFontScaling={false} style={{color: textColor?textColor:'#fff',fontFamily:fontFamily?fontFamily:'Montserrat-Medium',fontSize:fontSize?scale(fontSize):scale(16), textAlign:'center'}}>{title}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default BtnWithoutImage;