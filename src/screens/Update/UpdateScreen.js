import React from 'react';
import {View, Text, Image, Linking} from 'react-native';
import BtnWithoutImage from '../../components/atoms/BtnWithoutImage';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import SplashScreen from 'react-native-splash-screen';
import { serverConfig } from '../../constants/server.constants';
import { logout } from '../../store/actions/user.action'
import { connect } from 'react-redux';
import { MixpanelInstance } from '../../utils/analytics.util';

class UpdateScreen extends React.Component {

    componentDidMount() {
        let pkj =  require("../../../package.json")
        fetch(`${serverConfig.BASE_PATH}/appVersion`, {method: 'GET'})
        .then(res => res.json())
        .then(data => this.handleMoveForward(Number(pkj.version), Number(data.data), false))
        .catch(err => {
            console.log(err)
            this.handleMoveForward(100, 100, true)
        })
    }

    doesAppNeedsForceUpdate = (cr_v, lt_v) => {
        if(Number(cr_v) < Number(lt_v) ) return true
        return false
    }

    handleMoveForward = (cr_v, lt_v, err) => {
        // console.log(cr_v, lt_v, err)
        if(!err){
            if(this.doesAppNeedsForceUpdate(cr_v, lt_v)){
                this.props.logout()
                SplashScreen.hide()
            }else{
                this.props.navigation.navigate('LoginFlow', {screen : "EntryScreen"})
            }
        }else{
            console.log('here got some error')
            this.props.navigation.navigate('LoginFlow', { screen : "EntryScreen" })
        }
    }

    handleUpdateForward = async (url) => {
        MixpanelInstance.track("app_update")
        const supported = await Linking.canOpenURL(url)
        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert("Please Move Forward to PlayStore to Install the Update");
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
                        <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14), textAlign:'center'}}>A Newer Version is Waiting for You!</Text>
                     </View>
                     <View style={{height:scale(60)}} />
                     <View style={{height:scale(50), ...styles.rowCenter}}>
                          <View style={[{width:scale(250), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                              <BtnWithoutImage 
                                onPress = {() => this.handleUpdateForward("https://play.google.com/store/apps/details?id=com.healthhighwaylive") }
                                title="Update Now"
                               />
                          </View>
                     </View>
                    
                </View>
            </View>
        )
    }
}

export default connect(null, {logout})(UpdateScreen);