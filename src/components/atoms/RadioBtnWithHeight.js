import React, {useState} from 'react';
import {View, Text, TouchableNativeFeedback} from 'react-native';
import { scale } from '../../theme/metric';

const RadioBtnWithHeight = ({selected, title, onPress, paddingHorizontal, paddingVertical, fontSize, marginBottom, tag}) => {
    return(
        <View style={{borderRadius:scale(10),overflow: 'hidden',marginRight:scale(10),marginBottom:marginBottom?scale(marginBottom):scale(10), borderWidth:1, borderColor:"#4ca9ee", height : scale(30)}} >
            <TouchableNativeFeedback onPress={() => onPress(tag)} style={{overflow:'hidden'}} >
                <View style={{paddingHorizontal:paddingHorizontal?scale(paddingHorizontal):scale(15),backgroundColor:(selected == tag)?"#4ca9ee":"#fff", paddingVertical:paddingVertical?scale(paddingVertical):scale(15)}} >
                    <Text allowFontScaling={false} style={{color:(selected == tag)?'#fff':"#4ca9ee",fontFamily:'Montserrat-Semibold',fontSize:fontSize?scale(fontSize):scale(16)}}>{title}</Text>
                </View>
            </TouchableNativeFeedback>
        </View> 
    )
}

export default RadioBtnWithHeight;

