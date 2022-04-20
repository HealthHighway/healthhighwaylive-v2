import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';

const PrivatePlanBtn = ({ myPlan, selectedPlan, onPress, plans, currency }) => {
    return (
        <TouchableOpacity 
            activeOpacity={0.9}
            onPress={() => onPress(myPlan)}  
            style={{flex:1, height:scale(90), borderRadius:scale(8), margin:scale(4), backgroundColor: selectedPlan==myPlan?'#4ca9ee':'#fff', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor: selectedPlan==myPlan?"#4ca9ee":"#999FA4", ...styles.shadowStyle}} >
            
            <Text allowFontScaling={false} style={{color: selectedPlan==myPlan?'#fff':'#999FA4', backgroundColor:'transparent' , fontFamily:'Montserrat-Medium',fontSize:scale(12), marginBottom:scale(5) }}>{plans[myPlan].title}</Text>
            <View style={{alignItems: 'flex-end'}} >
                <Text allowFontScaling={false} style={{color: selectedPlan==myPlan?'#fff':'#999FA4', backgroundColor:'transparent' , fontFamily:'Montserrat-Medium',fontSize:scale(11), textDecorationLine:'line-through'}}>{plans[myPlan].originalPrice}</Text>
                <Text allowFontScaling={false} style={{color: selectedPlan==myPlan?'#fff':'#999FA4', backgroundColor:'transparent' , fontFamily:'Montserrat-Medium',fontSize:scale(12)}}>{currency} {plans[myPlan].discountedPrice}</Text>    
            </View>

            {selectedPlan==myPlan?<View style={{position:'absolute', alignSelf: 'center',width:scale(20), height:scale(20), backgroundColor:'transparent', bottom:-scale(10), justifyContent:'center', alignContent:'center' }} >
                <Image source={require("../../assets/images/triangle.png")} resizeMode="contain" style={{ width:'100%', height:'100%' }} />
            </View>:null}
        </TouchableOpacity>
    )
}

export default PrivatePlanBtn;