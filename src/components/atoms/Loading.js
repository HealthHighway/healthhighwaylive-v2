import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, ActivityIndicator, Dimensions} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const Loading = ({title}) => {
    return (
        <View style={{...styles.astyles,zIndex:100,alignItems:'center'}}>
            <View style={{...styles.astyles,backgroundColor:'white',opacity:0.1}} />
            <View style={{width:'70%',height:'20%',backgroundColor:'transparent',justifyContent:'center',alignItems:'center',marginTop:scale(280), borderRadius:scale(10)}}>
                <UIActivityIndicator color='#4ca9ee' />
                <Text allowFontScaling={false} style={{fontFamily:'OpenSans-Semibold',color:'#4CA9EE',fontSize:scale(15), marginTop:-scale(30)}}>{title?title:""}</Text>
            </View>
        </View>
    )
}

export default Loading;

