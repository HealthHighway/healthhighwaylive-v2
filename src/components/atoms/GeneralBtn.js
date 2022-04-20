import React from 'react';
import {View, Text, Image, TouchableNativeFeedback} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';

const GeneralBtn = ({imageUrl, title, backgroundColor, textColor, onPress, disabled}) => {
    return(
        <View style={{flex:1,height:'100%',backgroundColor,borderRadius:scale(7),overflow:'hidden',...styles.shadowStyle,flexDirection:'row'}} >
            <TouchableNativeFeedback 
               disabled={disabled}
               onPress={() => onPress()}
               style={{overflow:'hidden'}} >
                <View style={{width:'100%',height:'100%',...styles.shadowStyle,flexDirection:'row'}} >
                    <View style={{flex:1,...styles.rowCenter}} >
                        <Image source={imageUrl} resizeMode="contain" style={{height:'50%', width:'50%'}} />
                    </View>
                    <View style={{flex:3,...styles.rowCenter, justifyContent:'center'}} >
                        <Text allowFontScaling={false} style={{color:textColor,fontFamily:'Montserrat-Medium',fontSize:scale(15)}}>{title}</Text>
                    </View>
                    <View style={{flex:.8}} />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default GeneralBtn;