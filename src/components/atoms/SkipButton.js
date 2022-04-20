import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, ActivityIndicator, Dimensions, TouchableWithoutFeedback} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';

const SkipBtn = ({onPress, backgroundColor}) => {
    return(
        <View style={{width:'100%',height:'100%',backgroundColor:'transparent',borderRadius:scale(15),borderWidth:1,borderColor:'#4ca9ee',...styles.rowCenter,overflow: 'hidden'}} >
             <TouchableNativeFeedback onPress={() => onPress()} style={{overflow:'hidden'}} >
                <View style={{width:'100%',height:'100%',backgroundColor:backgroundColor?backgroundColor:'white',justifyContent:'center',alignItems:'center'}} >
                    <Text allowFontScaling={false} style={{color:'#4CA9EE',fontFamily:'Montserrat-Medium',fontSize:scale(15)}}>Skip</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default SkipBtn;