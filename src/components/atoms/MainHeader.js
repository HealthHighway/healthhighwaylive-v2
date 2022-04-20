import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, ActivityIndicator, Dimensions, TouchableWithoutFeedback, ScrollView, ToastAndroid, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import { MixpanelInstance } from '../../utils/analytics.util';

const MainHeader = (props) => {
    return (
        <View>
            <View style={{height:scale(10), backgroundColor : "white"}} />
            <View style={{height:scale(40), backgroundColor : "white", flexDirection:'row',alignItems:'center', paddingHorizontal:scale(15)}}>
                <View style={{width:scale(35), height: scale(35), backgroundColor:'white', borderRadius:scale(100), overflow: 'hidden', ...styles.shadowStyle, ...styles.rowCenter}} >
                    <Image source={!props.photo || props.photo.length==0?require('../../assets/images/logo-transparent.png'):{ uri : props.photo }} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                </View>
                <View>
                    <Text allowFontScaling={false} style={{color:'#434546',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginLeft : scale(10)}}>Hello {typeof(props.name) == "string" && props.name.length != 0?props.name.split(" ")[0]:"Yogi"}</Text>
                </View>
                <View style={{flex:1}} />
                <View style={{width:scale(20),flexDirection:'row', justifyContent:'center', alignItems:'center',height:'100%'}} >
                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            MixpanelInstance.track("notification_button")
                            props.navigation.navigate("NotificationScreen")
                        }} 
                        style={{overflow:'hidden'}} >
                        <View style={{backgroundColor:'#fff', width:"100%", height:"100%",flexDirection:'row', justifyContent:'center', alignItems:'center'}} >
                            <Image source={require('../../assets/images/notification.png')} resizeMode="contain" style={{height:'100%', width:'100%'}} />
                        </View>
                        {/* <View style={{position:'absolute', top:0, right:0, width:scale(10), height:scale(10), backgroundColor:'#DB0000', ...styles.rowCenter, borderRadius:scale(10)}} >
                            <Text allowFontScaling={false} style={{color:'#fff',fontFamily:'Montserrat-Medium',fontSize:scale(7)}}>1</Text>
                        </View> */}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{height:scale(10), backgroundColor : "white"}} />
        </View>
    )
}

export default MainHeader;