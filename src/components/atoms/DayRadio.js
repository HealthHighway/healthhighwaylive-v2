import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { scale } from '../../theme/metric';

const DayRadio = (props) => {
    return (
        <TouchableOpacity 
            onPress={() => {
                props.onPress(props.TIME_RANGE_CONSTANTS[props.id].min, props.TIME_RANGE_CONSTANTS[props.id].max)
            }} 
            activeOpacity={0.90} 
            style={{height:scale(25), width:'90%', backgroundColor:"#fff", marginBottom : scale(10), alignSelf:"center", flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}} >
            <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>{props.TIME_RANGE_CONSTANTS[props.id].title}</Text>
            <View style={{height:scale(23), width:scale(23), borderWidth:scale(2), borderColor:'#4ca9ee', backgroundColor:'#fff', padding:scale(3), borderRadius:scale(20)}} >
                {props.selectedTimeFilter == props.id?<View style={{flex:1, backgroundColor:'#29E7CD', borderRadius:scale(20)}} />:null}
            </View>
        </TouchableOpacity>
    )
}

export default DayRadio;
