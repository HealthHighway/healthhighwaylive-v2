import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, ActivityIndicator, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { scale } from '../../theme/metric';
import SkipBtn from './SkipButton';

const BackHeader = ({showSkip, onSkipPress, showBackBtn, onBackPress, showTitle, title, backgroundColor}) => {
    return(
        <View style={{flex:1,backgroundColor:backgroundColor?backgroundColor:'white',flexDirection:'row'}} >
            <View style={{width:scale(50),backgroundColor:backgroundColor?backgroundColor:'white'}} >
                <TouchableNativeFeedback disabled={!showBackBtn} onPress={() => onBackPress()} style={{overflow:'hidden'}} >
                     <View style={{width:'100%',height:'100%',backgroundColor:backgroundColor?backgroundColor:'white',justifyContent:'center',display:showBackBtn?"flex":"none"}} >
                        <Image source={require('../../assets/images/arrow.png')} resizeMode="contain" style={{height:'80%', width:'50%'}} />
                     </View>
                </TouchableNativeFeedback>
            </View>
            <View style={{flex:1, backgroundColor:backgroundColor?backgroundColor:'white', flexDirection:'row', alignItems:'center'}} >
              {showTitle?<Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(16), marginLeft:scale(30)}}>{title}</Text>:null}
            </View>
            {showSkip?<View style={{width:scale(80), backgroundColor:backgroundColor?backgroundColor:'white'}} >
                <SkipBtn backgroundColor={backgroundColor} onPress={() => onSkipPress()}/>
            </View>:null}
        </View>
    )
}

export default BackHeader;