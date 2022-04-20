import React from 'react';
import {View,Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../../theme/metric';

export default TabBarIcon = ({focused,routeName, focusedBackgroundColor, bluredBackgroundColor,size, badgeForCartScreen,paid}) => {
    let iconName, label;
    // console.log(routeName);
    if(routeName === "Home")
    {
        iconName = 'home';
        label = "Home";
    }
    else if(routeName === "Explore")
    {
        iconName = "explore";
        label = "Explore";
    }
    else if(routeName === "Class")
    {
        iconName = "class";
        label = "Class";
    }
    else
    {
        iconName = "person";
        label = "Profile";
    }

    return <View>
        {focused?
       <View style={{alignItems:'center'}}>
            <View style={{width:1.20*size,height:1.20*size,borderRadius:size/2,justifyContent:"center",alignItems:'center',backgroundColor:"white",marginTop:scale(0)}}>
                <Icon name={iconName} size={size} color="#4ca9ee" />
            </View>
            <Text allowFontScaling={false} style={{fontFamily:"Montserrat-Medium",color:"#4ca9ee",fontSize:scale(10)}}>{label}</Text>
       </View> 
       :
       <View style={{alignItems:'center'}}>
            <View style={{width:1.20*size,height:1.20*size,borderRadius:size/2,justifyContent:"center",alignItems:'center',backgroundColor:"white",marginTop:scale(0)}}>
                <Icon name={iconName} size={size} />
            </View>
            <Text allowFontScaling={false} style={{fontFamily:"Montserrat-Medium",color:"#555B5E",fontSize:scale(10)}}>{label}</Text>
       </View> 
        }
    </View>    
}