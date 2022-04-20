import React, {useState} from 'react';
import {View, Text, Image, TouchableNativeFeedback, ActivityIndicator, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { scale } from '../../theme/metric';

class SelectBtn extends React.Component {
    state = {
        pressed : false
    }
    handlePress = () => {
        this.setState({pressed : !this.state.pressed}, () => this.props.onPress(this.state.pressed))
    }
    render(){
        return(
            <View style={{borderRadius:scale(10),overflow: 'hidden',marginRight:scale(10),marginBottom:scale(10), borderWidth:1, borderColor:"#4ca9ee"}} >
                <TouchableNativeFeedback onPress={() => this.handlePress()} style={{overflow:'hidden'}} >
                    <View style={{paddingHorizontal:this.props.paddingHorizontal?scale(this.props.paddingHorizontal):scale(15),backgroundColor:this.state.pressed?"#4ca9ee":"#fff", paddingVertical:this.props.paddingVertical?scale(this.props.paddingVertical):scale(15)}} >
                        <Text allowFontScaling={false} style={{color:this.state.pressed?'#fff':"#4ca9ee",fontFamily:'Montserrat-SemiBold',fontSize:this.props.fontSize?scale(this.props.fontSize):scale(16)}}>{this.props.title}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

export default SelectBtn;