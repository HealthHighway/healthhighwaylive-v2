import React from 'react';
import {View, Text, Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import BtnWithoutImage from '../../components/atoms/BtnWithoutImage';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import { MixpanelInstance } from '../../utils/analytics.util';

class EntryScreen extends React.Component {

    componentDidMount() {
        if(this.props._id){
            if((this.props.bio && typeof this.props.bio == "object" && Object.keys(this.props.bio).length) || !this.props.showBioToFill){
                this.props.navigation.navigate("HomeStack", { screen : "BottomTabNavigator" })
            }else{
                this.props.navigation.navigate("BioOnEntry")
            }
        }else{
            SplashScreen.hide()
        }
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:'white'}} >
                <View style={{height:scale(10), backgroundColor : "white"}} />
                <View style={{flex:2.5,backgroundColor:'white', ...styles.rowCenter}}>
                    <Image source={require('../../assets/images/landing-anima.gif')} resizeMode="contain" style={{height:'100%', width:'100%'}} />
                </View>
                <View style={{flex:2.5,backgroundColor:'white'}} >
                     <View style={{height:scale(10)}} />
                     <View style={{height:scale(30), ...styles.rowCenter}}>
                        <Text allowFontScaling={false} style={{color:'#434546',fontFamily:'Montserrat-Medium',fontSize:scale(20)}}>Welcome To</Text>
                     </View>
                     <View style={{height:scale(50), ...styles.rowCenter,backgroundColor:'white', marginTop : scale(10)}}>
                        <View style={{flex:2}} />
                        <View style={{flex:12,backgroundColor:'white',height:'100%',flexDirection:'row',alignItems:'center'}} >
                            <View style={{flex:1,backgroundColor:'white',height:'100%',...styles.rowCenter}} >
                                <Image source={require('../../assets/images/logo.png')} resizeMode="contain" style={{height:'80%', width:'80%'}} />
                            </View>
                        </View>
                        <View style={{flex:2}} />
                     </View>
                     <View style={{height:scale(50), ...styles.rowCenter, paddingHorizontal : scale(50), marginTop : scale(10)}}>
                        <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14), textAlign:'center'}}>One place for all your Yoga Needs</Text>
                     </View>
                     <View style={{height:scale(60)}} />
                     <View style={{height:scale(50), ...styles.rowCenter}}>
                          <View style={[{width:scale(250), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                              <BtnWithoutImage 
                                onPress = {() => {
                                    MixpanelInstance.track("get_started_app")
                                    this.props.navigation.navigate("SignUpScreen")
                                }}
                                 title="Get Started"
                               />
                          </View>
                     </View>
                    
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log("from entry screen>>>", state.UserReducer._id, state.UserReducer.bio, state.UserReducer.showBioToFill)
    return {
        _id : state.UserReducer._id,
        bio : state.UserReducer.bio,
        showBioToFill : state.UserReducer.showBioToFill,
    }
}

export default connect(mapStateToProps, null)(EntryScreen)