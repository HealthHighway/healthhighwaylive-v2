import React from 'react';
import {View, Text, Image, Dimensions, Animated, Keyboard} from 'react-native';
import BackHeader from '../../components/atoms/BackHeader';
import BtnWithoutImage from '../../components/atoms/BtnWithoutImage';
import FlexibleBtn from '../../components/atoms/FlexibleBtn';
import InputField from '../../components/atoms/InputField';
import Loading from '../../components/atoms/Loading';
import { serverConfig } from '../../constants/server.constants';
import styles from '../../styles/styles';
import { scale, w, h } from '../../theme/metric';
import { upsertBio, hideFillBio } from '../../store/actions/user.action'
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { MixpanelInstance } from '../../utils/analytics.util';

class BioOnEntry extends React.Component {
    state={
        loading : false,
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height,
        xAnim : new Animated.Value(10),
        goal : '',
        age : "",
        weight : "",
        profession : "",
        language : "",
        pos : 0,
        showAilments : false,
        ailment : "",
        showBackBtn : false
    }

    componentDidMount(){
        SplashScreen.hide()
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({pos : 0}, () => this.actualScroll());
        });
        this.setState({
            age : this.props.bio && this.props.bio.age?this.props.bio.age:"", 
            weight : this.props.bio && this.props.bio.weight?this.props.bio.weight:""
        })
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    handleForward = (type, data) => {
        switch(type)
        {
            case "update_goal":
                if(data == "Heal Ailments")
                {
                    this.setState({showAilments : true, goal : data, showBackBtn : true}, () => this.scrollItForward())
                }
                else
                {
                    this.setState({goal : data, showBackBtn : true}, () => this.scrollItForward());
                }
                break;
            case "update_ailment":
                this.setState({ailment : data}, () => this.scrollItForward());
                break;
            case "update_age":
                Keyboard.dismiss();
                this.setState({age : data}, () => this.scrollItForward());
                break;
            case "update_weight":
                Keyboard.dismiss();
                this.setState({weight : data}, () => this.scrollItForward());
                break;
            case "update_profession":
                this.setState({profession : data}, () => this.scrollItForward())
                break;
            case "update_language":
                this.setState({language : data}, () => this.scrollItForward());
                break;
        }
    }

    upsertBio = async () => {

        const {goal, age, weight, profession, language} = this.state;

        console.log("printing before saving>>", {goal, age, weight, profession, language})

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
            }

            this.setState({ loading : false })
            
        })

    }

    handleSkipPress = async () => {
        this.props.hideFillBio()
        this.navigateToHomeScreen()
        // this.props.navigation.navigate("HomeStack")
    }

    scrollItForward = () => {
        if(this.state.showAilments)
        {
            (this.state.pos <= 4*w)?this.setState({pos : this.state.pos + w}, () => {
                this.actualScroll();
            }):this.navigateToHomeScreen()
        }
        else
        {
            (this.state.pos <= 3*w)?this.setState({pos : this.state.pos + w}, () => {
                this.actualScroll();
            }):this.navigateToHomeScreen()
        }
    }

    scrollItBackward = () => {
        if(this.state.pos == w)
        {
            this.setState({pos : this.state.pos - w, showBackBtn : false, showAilments : false}, () => {
                this.actualScroll();
            });
        }
        else 
        {
            this.setState({pos : this.state.pos - w}, () => {
                this.actualScroll();
            });
        }
    }

    actualScroll = () => {
        this.scrollview_ref.scrollTo({
            x : this.state.pos,
            y : 0,
            Animated : true
        });
    }

    navigateToHomeScreen = async () => {
        MixpanelInstance.track("full_bio_filled")
        const {goal, age, weight, profession, language} = this.state;
        console.log("printing before saving>>", {goal, age, weight, profession, language})
        if(!goal && !age && !weight && !profession && !language){
            this.props.navigation.navigate("HomeStack", { screen : "BottomTabNavigator" })
            return
        }

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
            }

            this.setState({ loading : false }, () => {
                this.props.navigation.navigate("HomeStack")
            })
            
        })
    }

    render() {
        const scrollX = this.state.xAnim.interpolate({
            inputRange : [0, w, 2*w, 3*w, 4*w, 5*w, 6*w],
            outputRange : [scale(3),scale(12),scale(19),scale(28),scale(37),scale(46),scale(55)],
            extrapolate : 'clamp'
        })
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >
                {this.state.loading?<Loading />:null}
                <View style={{position:'absolute',top:0,left:0,right:0,bottom:0, backgroundColor: 'white'}} >
                    <Image source={require('../../assets/images/pattern.png')} resizeMode="stretch" style={{height:'100%', width:'100%'}}  />
                </View>
                <View style={{height:scale(50),}} />
                <View style={{height:scale(30), flexDirection:'row',paddingHorizontal:scale(20)}} >
                    <BackHeader 
                        onBackPress={() => this.scrollItBackward()} 
                        showBackBtn={this.state.showBackBtn} 
                        showSkip={true} 
                        onSkipPress={() => this.handleSkipPress()} 
                    />
                </View>
                <View style={{height:scale(40),}} />
                  
                <Animated.ScrollView 
                      keyboardShouldPersistTaps="handled"
                       onScroll={
                            Animated.event(
                                [{nativeEvent : { contentOffset : {x : this.state.xAnim} }}],
                                {useNativeDriver : true}
                            ) 
                        }
                       ref={ref => {
                        this.scrollview_ref = ref ;
                           }}
                       horizontal={true} 
                       showsHorizontalScrollIndicator={false} 
                       pagingEnabled={true}
                       scrollEnabled={false} >
                      <View style={{width:this.state.width, height:scale(400),paddingHorizontal:scale(20)}} >
                            <View style={{height:scale(50),  ...styles.rowCenter, justifyContent:'flex-start'}} >
                                <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>What are you looking for?</Text>
                            </View>
                            <View style={{height:scale(20)}} />
                            <View style={{flex:1, flexDirection:'row', flexWrap : 'wrap'}} >
                                <FlexibleBtn fontSize="13" title="Weight loss" onPress={() => this.handleForward("update_goal", "Weight loss")} />
                                <FlexibleBtn fontSize="13" title="Heal Ailments" onPress={() => this.handleForward("update_goal", "Heal Ailments")} />
                                <FlexibleBtn fontSize="13" title="Better Mental Health" onPress={() => this.handleForward("update_goal", "Better Mental Health")} />
                                <FlexibleBtn fontSize="13" title="Get Fitter" onPress={() => this.handleForward("update_goal", "Get Fitter")} />
                                <FlexibleBtn fontSize="13" title="Learn Advanced Yoga" onPress={() => this.handleForward("update_goal", "Learn Advanced Yoga")} />
                            </View>
                      </View>
                      <View style={{width:this.state.width, height:scale(400),paddingHorizontal:scale(20), display:this.state.showAilments?"flex":"none"}} >
                            <View style={{height:scale(50),  ...styles.rowCenter, justifyContent:'flex-start'}} >
                                <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>What's bothering you?</Text>
                            </View>
                            <View style={{height:scale(20)}} />
                            <View style={{flex:1, flexDirection:'row', flexWrap : 'wrap'}} >
                                <FlexibleBtn fontSize="13" title="Diabetes" onPress={() => this.handleForward("update_ailment", "Diabetes")} />
                                <FlexibleBtn fontSize="13" title="Hypertension" onPress={() => this.handleForward("update_ailment", "Hypertension")} />
                                <FlexibleBtn fontSize="13" title="Eye Problems" onPress={() => this.handleForward("update_ailment", "Eye Problems")} />
                                <FlexibleBtn fontSize="13" title="Bone & Joint Pain" onPress={() => this.handleForward("update_ailment", "Bone & Joint Pain")} />
                                <FlexibleBtn fontSize="13" title="Thyroid Issues" onPress={() => this.handleForward("update_ailment", "Thyroid Issues")} />
                                <FlexibleBtn fontSize="13" title="Breathing Issues" onPress={() => this.handleForward("update_ailment", "Breathing Issues")} />
                                <FlexibleBtn fontSize="13" title="Not Sure" onPress={() => this.handleForward("update_ailment", "Not Sure")} />
                            </View>
                      </View>
                      <View style={{width:this.state.width, height:scale(400)}} >
                            <View style={{height:scale(50),  ...styles.rowCenter, justifyContent:'flex-start',paddingHorizontal:scale(20)}} >
                                <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>How old are you?</Text>
                            </View>
                            <View style={{height:scale(20)}} />
                            <View style={{height:scale(80),borderWidth:0}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:6,flexDirection:'row'}}>
                                    <View style={{flex:1}}></View>
                                    <View style={{flex:14}}>
                                        <InputField 
                                            onChangeText = {value => this.setState({age:value})}
                                            value = {this.state.age}
                                            placeholderText="Enter Your Age" 
                                            legendText="Your age" 
                                            secureTextEntry={false} 
                                            autoFocus={false} 
                                            imageUrl={require('../../assets/images/name.png')}
                                            type="number-pad" />
                                    </View>
                                    <View style={{flex:1}}></View>
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                            <View style={{height:scale(20)}} />
                            <View style={{height:scale(50), ...styles.rowCenter}}>
                                <View style={[{width:scale(300), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(7),overflow:'hidden'}, styles.shadowStyle]} >
                                    <BtnWithoutImage 
                                        onPress={() => this.handleForward("update_age", this.state.age)}
                                        title="Next"
                                    />
                                </View>
                            </View>
                      </View>
                      <View style={{width:this.state.width, height:scale(400)}} >
                            <View style={{height:scale(50),  ...styles.rowCenter, justifyContent:'flex-start',paddingHorizontal:scale(20)}} >
                                <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>What's your weight in Kgs?</Text>
                            </View>
                            <View style={{height:scale(20)}} />
                            <View style={{height:scale(80),borderWidth:0}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:6,flexDirection:'row'}}>
                                    <View style={{flex:1}}></View>
                                    <View style={{flex:14}}>
                                        <InputField 
                                            onChangeText = {value => this.setState({weight:value})}
                                            value = {this.state.weight}
                                            placeholderText="70" 
                                            legendText="Your Weight" 
                                            secureTextEntry={false} 
                                            autoFocus={false} 
                                            imageUrl={require('../../assets/images/name.png')}
                                            type="number-pad" />
                                    </View>
                                    <View style={{flex:1}}></View>
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                            <View style={{height:scale(20)}} />
                            <View style={{height:scale(50), ...styles.rowCenter}}>
                                <View style={[{width:scale(300), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(7),overflow:'hidden'}, styles.shadowStyle]} >
                                    <BtnWithoutImage 
                                        onPress={() => this.handleForward("update_weight", this.state.weight)}
                                        title="Next"
                                    />
                                </View>
                            </View>
                      </View>
                      <View style={{width:this.state.width, height:scale(400),paddingHorizontal:scale(20)}} >
                            <View style={{height:scale(50),  ...styles.rowCenter, justifyContent:'flex-start'}} >
                                <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>Any Language Preference</Text>
                            </View>
                            <View style={{height:scale(20)}} />
                            <View style={{flex:1, flexDirection:'row', flexWrap : 'wrap'}} >
                                <FlexibleBtn fontSize="14" title="हिंदी" onPress={() => this.handleForward("update_language", "Hindi")} />
                                <FlexibleBtn fontSize="14" title="English" onPress={() => this.handleForward("update_language", "English")} />
                                <FlexibleBtn fontSize="14" title="తెలుగు" onPress={() => this.handleForward("update_language", "Telugu")} />
                                <FlexibleBtn fontSize="14" title="Bengali" onPress={() => this.handleForward("update_language", "Bengali")} />
                                <FlexibleBtn fontSize="14" title="ಕನ್ನಡ" onPress={() => this.handleForward("update_language", "Kannada")} />
                            </View>
                      </View>
                      <View style={{width:this.state.width, height:scale(400),paddingHorizontal:scale(20)}} >
                            <View style={{height:scale(50),  ...styles.rowCenter, justifyContent:'flex-start'}} >
                                <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>Select Your Profession</Text>
                            </View>
                            <View style={{height:scale(20)}} />
                            <View style={{flex:1, flexDirection:'row', flexWrap : 'wrap'}} >
                                <FlexibleBtn fontSize="14" title="Student" onPress={() => this.handleForward("update_profession", "Student")} />
                                <FlexibleBtn fontSize="14" title="Service" onPress={() => this.handleForward("update_profession", "Service")} />
                                <FlexibleBtn fontSize="14" title="Home Maker" onPress={() => this.handleForward("update_profession", "Home Maker")} />
                                <FlexibleBtn fontSize="14" title="Self-Employed" onPress={() => this.handleForward("update_profession", "Self-Employed")} />
                                <FlexibleBtn fontSize="14" title="Other" onPress={() => this.handleForward("update_profession", "Other")} />
                            </View>
                      </View>
                </Animated.ScrollView>

                <View style={{height:scale(13),marginHorizontal:scale(40),borderWidth:1,borderColor:'#4ca9ee',borderRadius:scale(10),position:'relative',overflow: 'hidden'}} >
                    <Animated.View 
                        style={[{position:'absolute', backgroundColor:'#4ca9ee', left:0, top:0, bottom:0, width : 10}, {
                            transform : [{
                                scaleX : scrollX
                            }]
                        }]} />
                </View>

                <View style={{flex:1}} />
                
            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log("from mapsttaetoprops of bionoentry>>", state.UserReducer.bio, state.UserReducer._id)
    return {
        bio : state.UserReducer.bio,
        _id : state.UserReducer._id
    }
}

export default connect(mapStateToProps, {upsertBio, hideFillBio})(BioOnEntry)