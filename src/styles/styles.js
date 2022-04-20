//styles of location pop up menu
import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    istyles : {
        width: '100%',
        height:'100%'
    },astyles : {
        position : 'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
    },tstyles : {
        width:'100%',height:'100%'
    },
    shadowStyle : {
        shadowColor:'blue',
        shadowOffset:{width:4,height:4},
        shadowOpacity:.5,
        elevation:1
    },
    shadowNextStyle : {
        shadowColor:'black',
        shadowOffset:{width:15,height:15},
        shadowOpacity:.5,
        elevation:4
    },
    rowCenter:{
        flexDirection:'row',
        justifyContent:'center', 
        alignItems:'center'
    },
    colCenter:{
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center'
    }
}) 
    


export default styles;