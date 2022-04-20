import React from 'react';
import {View, Text, Dimensions, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import BackHeader from '../../components/atoms/BackHeader';
import BtnWithoutImage from '../../components/atoms/BtnWithoutImage';
import InputField from '../../components/atoms/InputField';
import Loading from '../../components/atoms/Loading';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import { manualOtpVerification, userEntryViaPhoneNumber } from '../../store/actions/user.action'

class OtpScreen extends React.Component {

    state={
        loading : false,
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height,
        otp : '',
        valid : false,
        sent : false
    }

    componentDidMount(){
        this._focuscribe = this.props.navigation.addListener('focus', () => {
            this.interval = setInterval(() => this.checkOTP(), 1000)
        })
        this._unsubscribe = this.props.navigation.addListener('blur', () => {
            clearInterval(this.interval);
        })
    }

    checkOTP = () => {
        if(this.props.isOtpVerified && this.props.phoneNumber)
        {  
            if(this.props._id.length == 0 && !this.state.sent)
            {
                this.setState({sent: true, loading : true}, () => {
                    console.log("here babes")
                    clearTimeout(this.timeout)
                    this.props.userEntryViaPhoneNumber({ phoneNumber : this.props.phoneNumber, location : this.props.location })
                })
            }
            else if(this.props._id.length != 0) {
                this.setState({loading: false}, () => {
                    this._unsubscribe();
                    this._focuscribe();
                    clearInterval(this.interval);
                    if(this.props.name.length == 0){
                        this.props.navigation.navigate('UserInfoScreen');
                    }else
                    {
                        if((this.props.bio && typeof this.props.bio == "object" && Object.keys(this.props.bio).length) || !this.props.showBioToFill) 
                        {   
                            this.props.navigation.navigate('HomeStack', { screen : "BottomTabNavigator" })
                        }
                        else
                        {
                            this.props.navigation.navigate('BioOnEntry')
                        }
                    }
                })
            }
        }
    }

    validate = () => {
        var regexp = /^\d{6}$/;
        if(regexp.test(this.state.otp))
        {
            this.setState({valid : true})
        }
        else
        {
            this.setState({valid : false})
        }
    }

    handleOTPVerification = (value) => {
        this.setState({otp : value}, this.validate);
    }

    handleOtpConfirm = () => {
        
        if(!this.state.valid)
        {
            ToastAndroid.show("Please enter 6 digit OTP", ToastAndroid.SHORT);
        }
        else
        {
            this.setState({ loading : true}, () => {
                this.props.manualOtpVerification({ otp : this.state.otp, otpResponse : this.props.otpResponse })
            })
        }
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >
                {this.state.loading?<Loading />:null}
                <View style={{height:scale(50), backgroundColor : "white"}} />
                <View style={{height:scale(30),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20)}} >
                    <BackHeader showSkip={false} showBackBtn={true} onBackPress={() => {
                        this.props.navigation.navigate('SignUpScreen')
                    }} />
                </View>
                <View style={{height:scale(30), backgroundColor : "white"}} />
                <View style={{height:scale(50), backgroundColor:'white',paddingHorizontal:scale(30), ...styles.rowCenter}} >
                    <Text allowFontScaling={false} style={{color:'#4CA9EE',fontFamily:'Montserrat-Medium',fontSize:scale(18)}}>Enter Verification Code</Text>
                </View>
                <View style={{height:scale(50), backgroundColor:'white',paddingHorizontal:scale(30), ...styles.colCenter}} >
                    <Text allowFontScaling={false} style={{color:'#716E6E',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>We have sent you a verification code to</Text>
                    <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(14), marginTop:scale(5)}}>{this.props.phoneNumber}</Text>
                </View>
                <View style={{height:scale(30)}}></View>
                <View style={{height:scale(80),borderWidth:0}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:6,flexDirection:'row'}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:10}}>
                            <InputField 
                                onChangeText = {value => this.handleOTPVerification(value)}
                                value = {this.state.otp}
                                placeholderText="* * * * * *" 
                                legendText="Enter OTP" 
                                secureTextEntry={false} 
                                autoFocus={true} 
                                imageUrl={require('../../assets/images/otp.png')}
                                type="number-pad" />
                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
                <View style={{height:scale(20)}} />
                <View style={{height:scale(50), ...styles.rowCenter, zIndex:10}}>
                    <View style={[{width:scale(280), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(7),overflow:'hidden'}, styles.shadowStyle]} >
                        <BtnWithoutImage 
                            onPress = {() => this.handleOtpConfirm()}
                            title="Confirm"
                        />
                    </View>
                </View>
                <View style={{flex:1}} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    // console.log("from otp screen>>", state.UserReducer.otpResponse, state.UserReducer.phoneNumber, state.UserReducer.isOtpVerified)
    return {
        otpResponse : state.UserReducer.otpResponse,
        phoneNumber : state.UserReducer.phoneNumber,
        isOtpVerified : state.UserReducer.isOtpVerified,
        _id : state.UserReducer._id,
        location : state.UserReducer.location,
        name : state.UserReducer.name,
        bio : state.UserReducer.bio,
        showBioToFill : state.UserReducer.showBioToFill,
    }
}

export default connect(mapStateToProps, { manualOtpVerification, userEntryViaPhoneNumber })(OtpScreen);