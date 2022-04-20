import React, { useState } from 'react';
import {Text,View,StyleSheet,TextInput, Image} from 'react-native';
import { scale } from '../../theme/metric';

const InputField = ({placeholderText,legendText,secureTextEntry,autoFocus,type,onChangeText,value, isPhoneNumber, imageUrl, hideLeft, specificFontSize, onSubmitEditing}) => {
    const styles = StyleSheet.create({
        inputStyle:{
            top:2,
            left:0,
            right:0,
            bottom:0,
            borderRadius:2,
            position:'absolute',
            color:'#6c7a89',
            flex:1,
            fontFamily:'Montserrat-Medium',
            fontSize:specificFontSize?scale(specificFontSize):scale(15)
        },fieldSetFocused:{
            width:'100%',
            height:'100%',
            flexDirection:'row',
            borderColor:'#4CA9EE',
            borderWidth:1,
            borderRadius:5,
            fontFamily:'Montserrat-Medium',
        },legendFocused:{
            position: 'absolute',
            top: -10,
            left: 0,
            fontWeight: '900',
            backgroundColor: 'white',
            color:'#4CA9EE',
            fontFamily:'Montserrat-Medium',
            fontSize:scale(14),
        },fieldSetBlured:{
            width:'100%',
            height:'100%',
            flexDirection:'row',
            borderRadius: 5,
            backgroundColor:'#E9F6FF',
            fontFamily:'Montserrat-Medium'
        },legendBlured:{
            display:"none"
        }
    });
    const[focused,setFocused] = useState(false);
    return <View style={[focused?styles.fieldSetFocused:styles.fieldSetBlured]}>
                {hideLeft?null:!isPhoneNumber?<View style={{flex:2,flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                    <Image source={imageUrl} resizeMode="contain" style={{height:'50%', width:'50%'}} />
                </View>:
                <View style={{flex:2,flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
                    <Text allowFontScaling={false} style={{color:'#B9B9B9',fontFamily:'Montserrat-Medium',fontSize:scale(15)}}>+91</Text>
                </View>}
                <View style={{width:scale(10)}} />
                <View style={{position:'relative',flex:10}}>
                    <TextInput
                        value={value}
                        allowFontScaling={false}
                        style={styles.inputStyle}
                        placeholder={placeholderText}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        autoCapitalize='none'
                        autoFocus={autoFocus}
                        keyboardType={type}
                        secureTextEntry={secureTextEntry}
                        importantForAutofill='no'
                        onChangeText={value => onChangeText(value)}
                        multiline={false}
                        />
                        <Text allowFontScaling={false}
                          style={focused?styles.legendFocused:styles.legendBlured}>{legendText}</Text>
                    </View>
                <View style={{flex:1}}></View>
           
         </View>
};

// const styles = StyleSheet.create({
//     inputStyle:{
//         top:2,
//         left:0,
//         right:0,
//         bottom:0,
//         borderRadius:2,
//         position:'absolute',
//         color:'#6c7a89',
//         flex:1,
//         fontFamily:'Montserrat-Medium',
//         fontSize:scale(15)
//     },fieldSetFocused:{
//         width:'100%',
//         height:'100%',
//         flexDirection:'row',
//         borderColor:'#4CA9EE',
//         borderWidth:1,
//         borderRadius:5,
//         fontFamily:'Montserrat-Medium'
//     },legendFocused:{
//         position: 'absolute',
//         top: -10,
//         left: 0,
//         fontWeight: '900',
//         backgroundColor: 'white',
//         color:'#4CA9EE',
//         fontFamily:'Montserrat-Medium',
//         fontSize:scale(14)
//     },fieldSetBlured:{
//         width:'100%',
//         height:'100%',
//         flexDirection:'row',
//         borderRadius: 5,
//         backgroundColor:'#eeeeee',
//         fontFamily:'Montserrat-Medium'
//     },legendBlured:{
//         display:"none"
//     }
// });

export default InputField;