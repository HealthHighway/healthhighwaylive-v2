import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, ScrollView, Linking, Alert, ToastAndroid} from 'react-native';
import ProfileDiv from '../../components/atoms/ProfileDiv';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import { logout, googleAuth } from '../../store/actions/user.action'
import { connect } from 'react-redux';
import Loading from '../../components/atoms/Loading';
import { MixpanelInstance } from '../../utils/analytics.util';

class ProfileScreen extends React.Component {

    state = {
        loading : false
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.gmailAddress != this.props.gmailAddress){
            ToastAndroid.show("Gmail Address Updated Succesfully", ToastAndroid.SHORT);
            this.setState({ loading : false })
        }
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                {this.state.loading?<Loading />:null}
                <View style={{height:scale(30)}} />
                <ScrollView>
                    <View style={{backgroundColor:'white', marginHorizontal:scale(20), flexDirection:'row'}} >
                        <View style={{...styles.rowCenter, backgroundColor:'white', borderRadius:scale(100), overflow: 'hidden', width:scale(100), height:scale(100), ...styles.shadowStyle}} >
                            <Image source={!this.props.profilePhotoUrl || this.props.profilePhotoUrl.length==0?require('../../assets/images/logo-transparent.png'):{ uri : this.props.profilePhotoUrl }} resizeMode="stretch" style={{height:'100%', width:'100%', borderRadius:scale(100)}} />
                        </View>
                        <View style={{width:scale(20), backgroundColor:'white'}} />
                        <View style={{flex:2, backgroundColor:'white'}} >
                            <View style={{flex:1, backgroundColor:'white'}} >
                                <TouchableNativeFeedback onPress={() => {}} >
                                    <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(13), marginTop:scale(10), width:'100%'}}>{(this.props.name)?this.props.name:"Your name : "}</Text>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={{flex:1, backgroundColor:'white'}} >
                                <TouchableNativeFeedback onPress={() => {
                                    if(!this.props.gmailAddress){
                                        MixpanelInstance.track("add_gmail_address")
                                        this.setState({ loading : true }, () => {
                                            this.props.googleAuth({_id:this.props._id})
                                        })
                                    }
                                }} >
                                    <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(12), marginTop:scale(10), width:'100%'}}>{(this.props.gmailAddress)?this.props.gmailAddress:"Add your Email"}</Text>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={{flex:1, backgroundColor:'white'}} >
                                <TouchableNativeFeedback onPress={() => {}} >
                                    <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(12), marginTop:scale(10), width:'100%', height:'100%'}}>{(this.props.phoneNumber)?this.props.phoneNumber:"Add your Phone Number"}</Text>
                                </TouchableNativeFeedback>
                            </View>
                        </View>
                    </View>
                    <View style={{height:scale(40)}} />
                    <ProfileDiv 
                        title="My Body Profile" 
                        onPress={() => {
                            MixpanelInstance.track("update_bio_profile")
                            this.props.navigation.navigate("UpdateBio")
                        }} 
                        imageUrl={require('../../assets/images/pr-bio.png')} 
                    />

                    <ProfileDiv 
                        title="Talk to Customer Support" 
                        onPress={() => {
                            MixpanelInstance.track("customer_support_profile")
                            Linking.openURL("tel:+919520785339")
                        }}
                        imageUrl={require('../../assets/images/pr-support.png')} 
                    />

                    <ProfileDiv 
                        title="FAQs" 
                        onPress={() => {
                            MixpanelInstance.track("faq")
                            this.props.navigation.navigate("FaqScreen")
                        }} 
                        imageUrl={require('../../assets/images/pr-faq.png')} 
                    />

                    <ProfileDiv 
                        title="Terms of Service" 
                        onPress={() => {
                            MixpanelInstance.track("tnc")
                            this.props.navigation.navigate("TncScreen")
                        }} 
                        imageUrl={require('../../assets/images/pr-accept.png')} 
                    />

                    <ProfileDiv 
                        title="Privacy Policy" 
                        onPress={() => {
                            MixpanelInstance.track("privacy_policy")
                            this.props.navigation.navigate("PrivacyPolicyScreen")
                        }} 
                        imageUrl={require('../../assets/images/pr-accept.png')} 
                    />

                    <ProfileDiv 
                        title="Logout" 
                        onPress={() => {
                            MixpanelInstance.track("log_out")
                            Alert.alert(
                                'Loging out...',
                                'Are you sure you want to log out?',
                                [
                                    {
                                      text: 'Cancel',
                                      onPress: () => console.log('Cancel Pressed'),
                                      style: 'cancel'
                                    },
                                    { text: 'OK', onPress: () => this.setState({ loading : true }, () => {
                                        setTimeout(() => {
                                            this.props.logout()
                                            this.setState({ loading : false }, () => {
                                                this.props.navigation.navigate("LoginFlow")
                                            })
                                        }, 2000)
                                    })}
                                ],
                                  { cancelable: false }
                            )
                            
                        }} 
                        imageUrl={require('../../assets/images/pr-logout.png')} 
                    />
                </ScrollView>
                
            </View>
        )
    }
}

const mapStateToProps = state => {
    // console.log("from profile>>>", state.UserReducer._id, state.UserReducer.gmailAddress)
    return {
        _id : state.UserReducer._id,
        name : state.UserReducer.name,
        gmailAddress : state.UserReducer.gmailAddress,
        phoneNumber : state.UserReducer.phoneNumber,
        profilePhotoUrl : state.UserReducer.profilePhotoUrl
    }
}

export default connect(mapStateToProps, { logout, googleAuth })(ProfileScreen)