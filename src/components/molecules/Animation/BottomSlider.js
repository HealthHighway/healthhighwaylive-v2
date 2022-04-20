import React from 'react';
import {View, Text, Animated, Easing, TouchableOpacity, Dimensions, Image} from 'react-native';
import styles from '../../../styles/styles';
import { scale } from '../../../theme/metric';
import DatePicker from 'react-native-date-picker'

class BottomSlider extends React.Component {

    state = {
        bottom : new Animated.Value(Dimensions.get("window").height + scale(100)),
        opacity : new Animated.Value(0),
        shouldRenderBlurredBg : false
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.shouldShowSlider !== this.props.shouldShowSlider){
            if(this.props.shouldShowSlider){
                this.showSlider()
            }else{
                this.hideSlider()
            }
        }
    }

    showSlider = () => {
        this.setState({ shouldRenderBlurredBg : true }, () => {
            Animated.parallel([
                Animated.timing(this.state.opacity, {
                    toValue: 0.3,
                    duration: 250,
                    easing : Easing.linear,
                    useNativeDriver : true
                }),
                Animated.timing(this.state.bottom, {
                    toValue : Dimensions.get("window").height - scale(this.props.HEIGHT-50),
                    duration : 250,
                    easing : Easing.linear,
                    useNativeDriver : true
                })
            ]).start(() => {
            })
        })
    }

    hideSlider = () => {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 100,
                easing : Easing.linear,
                useNativeDriver : true
            }),
            Animated.timing(this.state.bottom, {
                toValue : Dimensions.get("window").height + scale(100),
                duration : 100,
                easing : Easing.linear,
                useNativeDriver : true
            })
        ]).start(() => {
            this.setState({ shouldRenderBlurredBg : false }, () => {
                this.props.toggleShouldShowSlider()
            })
        })
    }

    render(){
        return (
            <View style={this.state.shouldRenderBlurredBg?{position: 'absolute', width:"100%", height:"100%", backgroundColor:"transparent"}:{display:"none"}} >
                <Animated.View style={this.state.shouldRenderBlurredBg?{position: 'absolute', width:"100%", height:"100%", opacity : this.state.opacity, backgroundColor:"#E9F6FF"}:{display:"none"}} >
                    <TouchableOpacity style={{width:"100%", height:"100%"}} activeOpacity={0.6} onPress={() => this.hideSlider()} />
                </Animated.View>
                <Animated.View style={[{ position:"absolute", height:scale(this.props.HEIGHT), width:"100%", backgroundColor:"#fff", alignItems: 'center', zIndex : 1000}, { 
                    transform: [
                        { translateY: this.state.bottom }
                    ]
                }]} >
                    <TouchableOpacity onPress={() => this.hideSlider()} activeOpacity={0.8} style={{alignSelf:'center', width:scale(30), height:scale(30), backgroundColor:"white", borderRadius:scale(100), ...styles.rowCenter, ...styles.shadowStyle, marginTop:-scale(20)}} >
                        <Image source={require('../../../assets/images/close.png')} resizeMode="contain" style={{height:'50%', width:'50%'}}  />
                    </TouchableOpacity>
                    <View style={{height:scale(40), width:"100%", ...styles.shadowStyle, ...styles.rowCenter}} >
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>{this.props.title}</Text>
                    </View>
                    <View style={{height:scale(20), width:"100%"}} />
                    <View style={{width:"100%", height:"100%", alignItems:"center"}} >
                        {this.state.shouldRenderBlurredBg?this.props.children:null}
                    </View>
                    
                </Animated.View>
            </View>
        )
    }
}

export default BottomSlider;