import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { scale } from '../../theme/metric';

const ProblemCheckBox = (props) => {
    return (
        <TouchableOpacity 
            onPress={() => props.onPress(props.myProblem)} 
            activeOpacity={0.5} 
            style={{height:scale(55), width:'90%', backgroundColor:"#EBF7FF", marginTop : scale(15), alignSelf:"center", flexDirection:'row', justifyContent:'flex-start', alignItems: 'center', borderRadius:scale(5), paddingHorizontal:scale(10)}} 
        >
            <View style={{height:scale(23), width:scale(23), borderWidth:scale(2), borderColor:'#4ca9ee', backgroundColor:'#fff', padding:scale(3)}} >
                {props.problems.has(props.myProblem)?<View style={{flex:1, backgroundColor:'#29E7CD'}} />:null}
            </View>
            <View style={{width:scale(20)}} />
            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>{props.myProblem}</Text>
            
        </TouchableOpacity>
    )
}

export default ProblemCheckBox;
