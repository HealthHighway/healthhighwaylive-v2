import React from 'react'
import {View, Text, Image, ScrollView} from 'react-native'
import BackHeaderWithTitleCentered from '../../components/atoms/BackHeaderWithTitleCentered'
import NotificationDiv from '../../components/atoms/NotificationDiv'
import { scale } from '../../theme/metric'

class NotificationScreen extends React.Component {
    render(){
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >
                <View style={{height:scale(10), backgroundColor : "white"}} />
                <View style={{height:scale(30),backgroundColor:'transparent', flexDirection:'row',paddingHorizontal:scale(20), zIndex:1000}} >
                    <BackHeaderWithTitleCentered onBackPress={() => this.props.navigation.goBack()} showBackBtn={true} showTitle={true} title="Latest Notifications"  />
                </View>
                <View style={{height:scale(10), backgroundColor : "white"}} />
                <View style={{position:'absolute',top:0,left:0,right:0,bottom:0, backgroundColor: 'white'}} >
                    <Image source={require('../../assets/images/pattern.png')} resizeMode="stretch" style={{height:'100%', width:'100%'}}  />
                </View>

                <View style={{flex:1, justifyContent:'center', alignItems: 'center'}} > 
                    <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>No Notification</Text>
                </View>

                {/* <ScrollView style={{flex:1}} >
                    <NotificationDiv />
                    <NotificationDiv />
                    <NotificationDiv />
                    <NotificationDiv />
                    <NotificationDiv />
                    <NotificationDiv />
                    <NotificationDiv />
                    <NotificationDiv />
                    <View style={{height:scale(40), backgroundColor : "white"}} />
                </ScrollView> */}
                

            </View>
        )
    }
}

export default NotificationScreen