import React from 'react';
import {View, Text, TouchableOpacity, Image, Pressable, LayoutAnimation, Platform, UIManager} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

class NotificationDiv extends React.Component {

    state={
        isExpanded : false,
        title : "Hey User!! A new group session has been added Hey User!! A new group session has been added A new group session has been added!!",
        description : "Hey User!! A new group session has been added Hey User!! A new group session has been added A new group session has been added!!"
    }

    render(){
        return (
            <TouchableOpacity 
                onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    this.setState({isExpanded : !this.state.isExpanded})
                }} 
                activeOpacity={0.95} 
                style={{width:"90%", borderRadius:scale(10), ...styles.shadowStyle, backgroundColor:'white', marginTop:scale(10), alignSelf:'center'}} 
            >
                <View style={{width:"100%", flexDirection:'row', alignItems: 'center', marginVertical:scale(10)}} >
                    <View style={{width:scale(30), height:scale(30), ...styles.rowCenter, marginHorizontal:scale(15)}} >
                        <Image source={require("../../assets/images/notification-icon.png")} resizeMode="contain" style={{height:'100%', width:'100%'}} />
                    </View>
                    <View style={{flex:1, backgroundColor:'white'}} >
                        {this.state.isExpanded?<Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(10)}}>{this.state.title}</Text>:<Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(10)}}>{this.state.title && typeof this.state.title === 'string' && this.state.title.length>=50?`${this.state.title.substring(0, 50)}...`:this.state.title}</Text>}
                        <View style={{marginTop:scale(4)}} />
                        <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(9)}}>3 Weeks Ago</Text>
                        {/* {this.state.isExpanded?<Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(9)}}>{this.state.description}</Text>:<Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(9)}}>{this.state.description && typeof this.state.description === 'string' && this.state.description.length>=50?`${this.state.description.substring(0, 50)}...`:this.state.description}</Text>} */}
                    </View>
                    <Pressable style={{width:scale(20), height:scale(20), ...styles.rowCenter, marginHorizontal:scale(15)}} >
                        <Image source={require("../../assets/images/delete.png")} resizeMode="contain" style={{height:'100%', width:'100%'}} />
                    </Pressable>
                </View>
                
            </TouchableOpacity>
        )
    }
}

export default NotificationDiv;