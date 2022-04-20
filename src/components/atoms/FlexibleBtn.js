import React from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';

const FlexibleBtn = ({title, onPress, paddingHorizontal, paddingVertical, fontSize}) => {
    return(
        <View style={{borderRadius:scale(10),overflow: 'hidden',marginRight:scale(10),marginBottom:scale(10),...styles.shadowStyle}} >
            <TouchableNativeFeedback onPress={() => onPress()} style={{overflow:'hidden'}} >
                <View style={{paddingHorizontal:paddingHorizontal?scale(paddingHorizontal):scale(15),backgroundColor:'#4ca9ee',...styles.rowCenter, paddingVertical:paddingVertical?scale(paddingVertical):scale(15)}} >
                    <Text allowFontScaling={false} style={{color:'#fff',fontFamily:'Montserrat-SemiBold',fontSize:fontSize?scale(fontSize):scale(16)}}>{title}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default FlexibleBtn;