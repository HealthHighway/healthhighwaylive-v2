import React from 'react';
import {View, ScrollView, TouchableOpacity, Animated, LayoutAnimation, NativeModules, Text} from 'react-native';
import styles from '../../../styles/styles';
import { scale } from '../../../theme/metric';
import { MixpanelInstance } from '../../../utils/analytics.util';
import BtnWithoutImage from '../../atoms/BtnWithoutImage';


const ServiceListing = ({ title, analyticsTitle, detail, btnPressEvent, btnTitle, titleColor, detailColor, navigation, pointers, flashyLine, disabled }) => {
    return (
        <View style={{flex:1, backgroundColor:"white", ...styles.shadowNextStyle, borderRadius : scale(20) }} >
            <Text allowFontScaling={false} style={{color:titleColor,fontFamily:'Montserrat-SemiBold',fontSize:scale(16), marginHorizontal:scale(20), marginTop: scale(20)}}>{title}</Text>
            <Text allowFontScaling={false} style={{color:"#27214F",fontFamily:'Montserrat-Medium',fontSize:scale(12), marginHorizontal:scale(20), marginTop: scale(20)}}>{detail}</Text>
            <Text allowFontScaling={false} style={{color:titleColor,fontFamily:'Montserrat-SemiBold',fontSize:scale(14), marginHorizontal:scale(20), marginTop: scale(20)}}>{flashyLine}</Text>
            <View style={{alignSelf: 'center', marginTop : scale(10)}} >
                {pointers.map(pointer => (
                    <Text key={pointer} allowFontScaling={false} style={{color:"#27214F",fontFamily:'Montserrat-Medium',fontSize:scale(12), marginHorizontal:scale(20), marginTop: scale(6)}}>· {pointer}</Text>
                ))}
            </View>
            <View style={{height:scale(40), ...styles.rowCenter, marginVertical: scale(20) }}>
                <View style={[{width:scale(200), backgroundColor:'#fff', height:'100%', borderRadius:scale(20),overflow:'hidden'}, styles.shadowStyle]} >
                    <BtnWithoutImage
                        backgroundColor="#4ca9ee"
                        textColor="#fff"
                        onPress = {() => {
                            if(!disabled){
                                MixpanelInstance.track(analyticsTitle)
                                navigation.navigate(btnPressEvent)
                            }
                        }}
                        title={btnTitle}
                    />
                </View>
            </View>
        </View>
    )
}

export default ServiceListing