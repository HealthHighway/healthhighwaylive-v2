import React from 'react';
import {View, Dimensions, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import BackHeader from '../../components/atoms/BackHeader';
import GeneralBtn from '../../components/atoms/GeneralBtn';
import InputField from '../../components/atoms/InputField';
import Loading from '../../components/atoms/Loading';
import { scale } from '../../theme/metric';
import { addName } from '../../store/actions/user.action'
import { MixpanelInstance } from '../../utils/analytics.util';

class UserInfoScreen extends React.Component {

    state={
        loading : false,
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height,
        name : ''
    }

    handleNameSubmit = () => {
        if(this.state.name.length){
            this.setState({ loading : true }, () => {
                MixpanelInstance.track("name_added_userinfo_page")
                this.props.addName({ name : this.state.name.trim(), _id : this.props._id })
            })
        }else{
            ToastAndroid.show("Please enter name", ToastAndroid.SHORT);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.name != this.props.name){
            if(this.props.name){
                this.setState({ loading: false }, () => {
                    if((this.props.bio && typeof this.props.bio == "object" && Object.keys(this.props.bio).length) || !this.props.showBioToFill) 
                    {   
                        this.props.navigation.navigate('HomeStack', { screen : "BottomTabNavigator" })
                    }
                    else
                    {
                        this.props.navigation.navigate('BioOnEntry')
                    }
                })
            }else{
                this.setState({ loading : false })
            }
        }
        // check if no _id, then run action of logout
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >
                {this.state.loading?<Loading />:null}
                <View style={{height:scale(50), backgroundColor : "white"}} />
                <View style={{height:scale(30),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20)}} >
                    <BackHeader showBackBtn onBackPress={() => this.props.navigation.navigate("EntryScreen")} />
                </View>
                <View style={{height:scale(30), backgroundColor : "white"}} />
                <View style={{height:scale(80),borderWidth:0}}>
                    <View style={{flex:1}}></View>
                    <View style={{flex:6,flexDirection:'row'}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:10}}>
                            <InputField 
                                onChangeText = {value => this.setState({name:value})}
                                value = {this.state.name}
                                placeholderText="Enter Your name" 
                                legendText="Your name" 
                                secureTextEntry={false} 
                                autoFocus={false} 
                                specificFontSize={14}
                                imageUrl={require('../../assets/images/name.png')}
                                type="default" />
                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
                <View style={{height:scale(10)}} />
                <View style={{height:scale(50), flexDirection:'row', justifyContent:'center', alignItems:'center',backgroundColor:'white',paddingHorizontal:scale(30)}}>
                    <GeneralBtn title="Continue" imageUrl={require('../../assets/images/send.png')} backgroundColor="#4ca9ee" textColor='#fff' onPress={() => this.handleNameSubmit()} />       
                </View>
                <View style={{height:scale(40)}} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log("inside userinfiscreen>>", state.UserReducer.name)
    return {
        _id : state.UserReducer._id,
        name : state.UserReducer.name,
        bio : state.UserReducer.bio,
        showBioToFill : state.UserReducer.showBioToFill,
    }
}

export default connect(mapStateToProps, { addName })(UserInfoScreen)