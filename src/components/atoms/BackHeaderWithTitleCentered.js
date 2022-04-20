import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackHeaderWithTitleCentered = ({showSkip, onSkipPress, showBackBtn, onBackPress, showTitle, title, backgroundColor, showLikeBtn, isLiked, onLikePress}) => {

    return(
        <View style={{flex:1,backgroundColor:backgroundColor?backgroundColor:'transparent',flexDirection:'row'}} >
            <View style={{width:scale(50),backgroundColor:backgroundColor?backgroundColor:'transparent'}} >
                <TouchableNativeFeedback disabled={!showBackBtn} onPress={() => onBackPress()} style={{overflow:'hidden'}} >
                     <View style={{width:'100%',height:'100%',backgroundColor:backgroundColor?backgroundColor:'transparent',justifyContent:'center',display:showBackBtn?"flex":"none"}} >
                        <Image source={require('../../assets/images/arrow.png')} resizeMode="contain" style={{height:'80%', width:'50%'}} />
                     </View>
                </TouchableNativeFeedback>
            </View>
            <View style={{flex:1, backgroundColor:backgroundColor?backgroundColor:'transparent', flexDirection:'row', alignItems:'center', justifyContent:'center'}} >
              {showTitle?<Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(16)}}>{title}</Text>:null}
            </View>
            <View style={{width:scale(50),backgroundColor:backgroundColor?backgroundColor:'transparent', ...styles.rowCenter}} >
                {showLikeBtn?<TouchableOpacity 
                    activeOpacity={0.6} 
                    onPress={() => onLikePress()} 
                    style={{width:scale(40), backgroundColor:'transparent', borderRadius:scale(100), overflow:'hidden', justifyContent:'center', alignItems:'center'}} >
                    <Icon name={isLiked?"favorite":"favorite-border"} size={27} color="#4ca9ee" />
                </TouchableOpacity>:null}
            </View>
        </View>
    )
}

export default BackHeaderWithTitleCentered;