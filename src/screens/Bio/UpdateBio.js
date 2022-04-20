import React from 'react';
import {View, Text, Dimensions, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import BackHeaderWithTitleCentered from '../../components/atoms/BackHeaderWithTitleCentered';
import BtnWithoutImage from '../../components/atoms/BtnWithoutImage';
import InputField from '../../components/atoms/InputField';
import Loading from '../../components/atoms/Loading';
import { serverConfig } from '../../constants/server.constants';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import { upsertBio } from '../../store/actions/user.action'
import { MixpanelInstance } from '../../utils/analytics.util';

class UpdateBio extends React.Component {
    state={
        width : Dimensions.get('screen').width,
        goal : "",
        age : "",
        weight : "",
        profession : "",
        language : "",
        loading : false,
    }

    componentDidMount(){
        this.setState({
            goal : this.returnKeyVal("goal"),
            age : this.returnKeyVal("age"),
            weight: this.returnKeyVal("weight"),
            profession : this.returnKeyVal("profession"),
            language : this.returnKeyVal("language"),
        })
    }

    returnKeyVal = (key) => {
        return this.props.bio && this.props.bio[key]?this.props.bio[key]:""
    }

    handleUpsertBio = () => {

        MixpanelInstance.track("update_bio")

        let {goal, age, weight, profession, language} = this.state
        goal=goal.trim()
        age=age.trim()
        weight=weight.trim()
        profession=profession.trim()
        language=language.trim()

        this.setState({ loading : true }, async () => {
            try{
                const response = await fetch(`${serverConfig.BASE_PATH}/user/upsertBio`, {
                    method : "POST",
                    timeout:5000,
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        userId : this.props._id,
                        bio : {
                            goal, age, weight, profession, language
                        }
                    })
                })
                
                console.log(response.status)
                if(response.status == 200){
                    const {data} = await response.json()
                    console.log(data)
                    this.props.upsertBio(data.bio)
                }
    
            }catch(err){
                console.log(err)
                ToastAndroid.show("Some Error!! Please update your bio later", ToastAndroid.SHORT);
            }

            this.setState({ loading : false }, () => {
                ToastAndroid.show("Bio Updated", ToastAndroid.SHORT);
            })
            
        })
    }

    render() {
        return(
            <View style={{flex:1, backgroundColor: 'white'}} >
                {this.state.loading?<Loading />:null}
                <View style={{height:scale(30), backgroundColor : "white"}} />
                <View style={{height:scale(30),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20)}} >
                    <BackHeaderWithTitleCentered onBackPress={() => this.props.navigation.goBack()} showBackBtn={true} showTitle={true} title="Update Bio"  />
                </View>
                <View style={{height:scale(30)}} />
                
                <View style={{height:scale(100), paddingHorizontal:scale(20), backgroundColor:'white', flexDirection:'row', paddingTop:scale(10)}} >
                    <View style={{flex:1}} >
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>Weight (in Kgs)</Text>
                            <View style={{height:scale(60),borderWidth:0, marginTop:scale(7)}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:6,flexDirection:'row'}}>
                                    <View style={{flex:10}}>
                                        <InputField 
                                            onChangeText = {value => this.setState({weight:value})}
                                            value = {this.state.weight}
                                            placeholderText="70" 
                                            legendText="" 
                                            secureTextEntry={false} 
                                            autoFocus={false} 
                                            hideLeft={true}
                                            specificFontSize={13}
                                            type="number-pad" />
                                    </View>
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                    </View>
                    <View style={{width:scale(10), backgroundColor:'white'}} />
                    <View style={{flex:1}} >
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>Age</Text>
                            <View style={{height:scale(60),borderWidth:0, marginTop:scale(7)}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:6,flexDirection:'row'}}>
                                    <View style={{flex:10}}>
                                        <InputField 
                                            onChangeText = {value => this.setState({age:value})}
                                            value = {this.state.age}
                                            placeholderText="24"
                                            legendText="" 
                                            secureTextEntry={false} 
                                            autoFocus={false} 
                                            hideLeft={true}
                                            specificFontSize={13}
                                            type="number-pad" />
                                    </View>
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                    </View>
                </View>

                <View style={{height:scale(10)}} />

                <View style={{height:scale(100), paddingHorizontal:scale(20), backgroundColor:'white', flexDirection:'row', paddingTop:scale(10)}} >
                    <View style={{flex:1}} >
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>Language Preferred</Text>
                            <View style={{height:scale(60),borderWidth:0, marginTop:scale(7)}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:6,flexDirection:'row'}}>
                                    <View style={{flex:10}}>
                                        <InputField 
                                            onChangeText = {value => this.setState({language:value})}
                                            value = {this.state.language}
                                            placeholderText="English" 
                                            legendText="" 
                                            secureTextEntry={false} 
                                            autoFocus={false} 
                                            hideLeft={true}
                                            specificFontSize={13}
                                            type="default" />
                                    </View>
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                    </View>
                    <View style={{width:scale(10), backgroundColor:'white'}} />
                    <View style={{flex:1}} >
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>My Profession</Text>
                            <View style={{height:scale(60),borderWidth:0, marginTop:scale(7)}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:6,flexDirection:'row'}}>
                                    <View style={{flex:10}}>
                                        <InputField 
                                            onChangeText = {value => this.setState({profession:value})}
                                            value = {this.state.profession}
                                            placeholderText="24"
                                            legendText="" 
                                            secureTextEntry={false} 
                                            autoFocus={false} 
                                            hideLeft={true}
                                            specificFontSize={13}
                                            type="default" />
                                    </View>
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                    </View>
                </View>

                <View style={{marginHorizontal:scale(15)}} >
                    <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>Goal/Problem</Text>
                    <View style={{height:scale(100),borderWidth:0, marginTop:scale(7)}}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:6,flexDirection:'row'}}>
                            <View style={{flex:10}}>
                                <InputField 
                                    onChangeText = {value => this.setState({goal:value})}
                                    value = {this.state.goal}
                                    placeholderText="Want to lose weight..."
                                    legendText="" 
                                    secureTextEntry={false} 
                                    autoFocus={false} 
                                    hideLeft={true}
                                    specificFontSize={13}
                                    type="default" />
                            </View>
                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                </View>
                
                <View style={{height:scale(40), ...styles.rowCenter, marginVertical: scale(20), marginTop:scale(30)}}>
                    <View style={[{width:scale(250), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                        <BtnWithoutImage 
                            onPress = {() => this.handleUpsertBio()}
                            title="Continue"
                        />
                    </View>
                </View>

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        bio : state.UserReducer.bio,
        _id : state.UserReducer._id
    }
}

export default connect(mapStateToProps, {upsertBio})(UpdateBio)