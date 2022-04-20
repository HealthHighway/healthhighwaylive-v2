import React from 'react';
import {View, Dimensions, BackHandler, ToastAndroid} from 'react-native';
import PhoneInput from "react-native-phone-number-input";
import BackHeader from '../../components/atoms/BackHeader';
import GeneralBtn from '../../components/atoms/GeneralBtn';
import InputField from '../../components/atoms/InputField';
import Loading from '../../components/atoms/Loading';
import { scale } from '../../theme/metric';
import { initialisePhoneFlow, initiatePhoneAuth } from '../../store/actions/user.action'
import { connect } from 'react-redux';
import { MixpanelInstance } from '../../utils/analytics.util';

class SignUpScreen extends React.Component {

    constructor(props) {
        super(props);
        this.phoneRef = React.createRef();
    }

    componentDidMount() {
        this.props.initialisePhoneFlow()
    }

    state={
        loading : false,
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height,
        valid : false,
        phone : '',
        initialCountryCode : 'IN'
    }

    validate = () => {
        if(this.phoneRef && this.phoneRef.current && this.phoneRef.current.isValidNumber(this.state.phone) ){
            this.setState({valid : true})
        }else{
            this.setState({valid : false})
        }
    }

    handleNumberVerification = (value) => {
        this.setState({phone : value}, this.validate);
    }

    handleSendOTP = () => {

        MixpanelInstance.track("send_otp")
        if(!this.state.valid){
            ToastAndroid.show("Please Enter a Valid Mobile Number", ToastAndroid.SHORT);
        }else{
            // hit the initialize phone auth action
            this.props.initiatePhoneAuth({phoneNumber : this.state.phone})
            this.props.navigation.navigate("OtpScreen")
            // navigate to otp screen
            // ToastAndroid.show(`this is my number ${this.state.phone}`, ToastAndroid.SHORT);

        }

    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >
        
                {this.props.loading?<Loading />:null}
                <View style={{height:scale(50), backgroundColor : "white"}} />
                <View style={{height:scale(30),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20)}} >
                    <BackHeader showBackBtn={true} onBackPress={() => {
                        this.props.navigation.navigate('EntryScreen')
                    }} />
                </View>
                <View style={{height:scale(50), backgroundColor : "white"}} />
                <View style={{height:scale(80),borderWidth:0}}>
                    <PhoneInput
                        ref={this.phoneRef}
                        defaultValue={""}
                        defaultCode={this.state.initialCountryCode}
                        layout="first"
                        onChangeText={(text) => {
                            // console.log(text);
                        }}
                        onChangeFormattedText={(text) => {
                            this.handleNumberVerification(text)
                        }}
                        withDarkTheme={false}
                        // withShadow
                        autoFocus
                        containerStyle={{ alignSelf: 'center', height : scale(65), fontFamily:'Montserrat-Medium', borderWidth:1, borderColor:'#EBF0F4', borderRadius:scale(10), overflow:'hidden', backgroundColor:'#EBF0F4' }}
                        textInputStyle={{ fontFamily:'Montserrat-Medium', backgroundColor:'#EBF0F4' }}
                        textContainerStyle={{ fontFamily:'Montserrat-Medium', backgroundColor:'#EBF0F4' }}
                        codeTextStyle={{ fontFamily:'Montserrat-Medium', fontSize:scale(16), marginTop: scale(-5) }}
                        countryPickerButtonStyle={{ width:scale(60) }}
                    />
                </View>
                <View style={{height:scale(10)}} />
                <View style={{height:scale(50), flexDirection:'row', justifyContent:'center', alignItems:'center',backgroundColor:'white',paddingHorizontal:scale(30)}}>
                    <GeneralBtn title="Send OTP" imageUrl={require('../../assets/images/send.png')} backgroundColor="#4ca9ee" textColor='#fff' onPress={() => this.handleSendOTP()} />       
                </View>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps, { initialisePhoneFlow, initiatePhoneAuth })(SignUpScreen)