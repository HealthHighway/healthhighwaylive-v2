import React from 'react'
import {View, Text, ScrollView, Image, Dimensions, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import { getMyLocation } from '../../../utils/location.util';
import { updateLocation } from '../../../store/actions/user.action'
import { addPrivateInfo } from '../../../store/actions/privateSession.action'
import { serverConfig } from '../../../constants/server.constants';
import Loading from '../../../components/atoms/Loading';
import { scale } from '../../../theme/metric';
import BackHeader from '../../../components/atoms/BackHeader';
import PrivatePlanBtn from '../../../components/atoms/PrivatePlanBtn';
import { MixpanelInstance } from '../../../utils/analytics.util';

const FilledTick = () => {
    return <Image source={require("../../../assets/images/filledTick.png")} resizeMode="contain" style={{ width:'40%', height:'40%' }} />
}

const UnfilledTick = () => {
    return <Image source={require("../../../assets/images/unfilledTick.png")} resizeMode="contain" style={{ width:'30%', height:'30%' }} />
}

class SessionPlan extends React.Component {

    state = {
        currency : "INR",
        plans : [],
        loading : false,
        width : Dimensions.get('screen').width,
        height : Dimensions.get('screen').height,
        PLATFORM_PRIVATE_PRICE : [],
        selected : "Standalone",
        selectedPrice : "Yoga Fan",
        selectedPlan : 0
    }

    async componentDidMount() {
        if(this.props.location && this.props.location["country"]){
            // make api call
            this.fetchPlans()
        }else{
            try{
                const location = await getMyLocation()
                this.props.updateLocation(location)
            }catch(err){
                console.log(err)
                this.props.updateLocation({})
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.location !== this.props.location){
            if(this.props.location.country){
                this.fetchPlans()
                //send api request to fetch my plans
            }
        }
    }

    fetchPlans = async () => {
        this.setState({ loading: true }, () => {
            fetch(`${serverConfig.BASE_PATH}/user/privateSessionPlans`, {
                method: 'POST',
                timeout:5000,
                headers : { 'Content-Type': 'application/json' },
                body : JSON.stringify({
                    country : this.props.location.country
                })
            })
            .then(res => res.json())
            .then(data => this.setState({ loading: false, plans : data.data.plans, currency : data.data.currency }))
            .catch(err => this.setState({ loading : false, plans : [], currency : "INR" }))
        })
        
    }

    handleCheckOut = () => {
        MixpanelInstance.track("session_plan_added")
        const myPlan = this.state.plans[this.state.selectedPlan]
        if(this.props.privateSessionsBooked.length){
            this.props.addPrivateInfo({ price : myPlan.discountedPrice, currency:this.state.currency, sessionCount : myPlan.sessions })
        }else{
            this.props.addPrivateInfo({ price : myPlan.firstTimeDiscountedPrice, currency:this.state.currency, sessionCount : myPlan.sessions })
        }
        this.props.navigation.navigate("PrivateCheckOut")
    }

    render(){

        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                {this.state.loading?<Loading />:null}

                {this.state.plans.length && !this.state.loading ? <View style={{flex:1}} >
                    <View style={{position: 'absolute',bottom:0,left:0,right:0,height:scale(70),backgroundColor:'#4ca9ee',zIndex:2, paddingHorizontal:scale(30), flexDirection:'row', alignItems: 'center'}} >
                        <View style={{flex:1, backgroundColor:''}} >
                            <Text allowFontScaling={false} style={{color:'#fff',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>{(this.state.selectedPlan==0)?"1 on 1 Session":this.state.selectedPrice}</Text>
                            <Text allowFontScaling={false} style={{color:'#fff',fontFamily:'Montserrat-Medium',fontSize:scale(15)}}>{(this.state.selectedPlan==0)?"One Time":this.state.plans[this.state.selectedPlan]["sessions"]+" Sessions"}</Text>
                        </View>
                        <TouchableOpacity 
                            activeOpacity={0.9} 
                            onPress = {() => this.handleCheckOut()} 
                            style={{width:scale(130),height:scale(35),backgroundColor:'white', borderRadius:scale(10),justifyContent:'center',alignItems: 'center'}} 
                        >
                            <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(15)}}>Checkout</Text>
                        </TouchableOpacity>
                    </View>

                    

                    <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} >  
                        <View style={{height:scale(20)}} />
                        <View style={{height:scale(30),backgroundColor:'white', flexDirection:'row', paddingHorizontal:scale(20)}} >
                            <BackHeader 
                                showBackBtn={true} 
                                showSkip={false} 
                                onBackPress={() => {
                                    this.props.navigation.goBack()
                                }} 
                            />
                        </View>
                        <View style={{height:scale(30)}} />
                        <View style={{backgroundColor:'white',paddingHorizontal:scale(30), alignItems:'center', justifyContent:'center' }}>
                            <Text allowFontScaling={false} style={{color:'#4B4848',fontFamily:'Montserrat-Medium',fontSize:scale(16)}}>Choose the plan that’s right for you</Text>
                        </View>

                        <View style={{height:scale(30), backgroundColor:'white', width:scale(250), alignSelf: 'center', flexDirection:'row', marginTop:scale(10)}} >
                            <View style={{flex:1.3}} />
                            <View style={{flex:1, backgroundColor:'white',justifyContent:'center', alignContent:'center'}} >
                                <Image source={require('../../../assets/images/ellipticalText.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                            </View>
                        </View>

                        <View style={{height:scale(40), width:scale(250), backgroundColor:'#D4EDFF', borderRadius:scale(20), alignSelf:'center', flexDirection:'row', overflow: 'hidden'}} >
                            <TouchableOpacity activeOpacity={0.90} onPress={() => this.setState({ selectedPlan : 0 })} style={{flex:1, backgroundColor: this.state.selectedPlan == 0?'#fff':'#d4edff', justifyContent:'center', alignItems:'center', borderRadius:scale(20), margin:scale(3), marginRight:0}} >
                                <Text allowFontScaling={false} style={{color:'#4B4848',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>Standalone</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.90} onPress={() => this.setState({ selectedPlan : 1 })} style={{flex:1, backgroundColor: this.state.selectedPlan != 0?'#fff':'#d4edff', justifyContent:'center', alignItems:'center', borderRadius:scale(20), margin:scale(3), marginLeft:0}} >
                                <Text allowFontScaling={false} style={{color:'#4B4848',fontFamily:'Montserrat-Medium',fontSize:scale(14)}}>Packages</Text>
                            </TouchableOpacity>
                        </View>

                        {this.state.selectedPlan!=0?<View>
                            <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(13), alignSelf: 'center', marginTop : scale(30)}}>Most Popular</Text>

                            <View style={{marginHorizontal:scale(30), backgroundColor:'white', marginTop:scale(10), flexDirection:'row' }} >

                                <PrivatePlanBtn
                                    myPlan={1}
                                    selectedPlan={this.state.selectedPlan}
                                    onPress={(plan) => this.setState({ selectedPlan: plan})}
                                    plans={this.state.plans}
                                    currency={this.state.currency}
                                />

                                <PrivatePlanBtn
                                    myPlan={2}
                                    selectedPlan={this.state.selectedPlan}
                                    onPress={(plan) => this.setState({ selectedPlan: plan})}
                                    plans={this.state.plans}
                                    currency={this.state.currency}
                                />

                                <PrivatePlanBtn
                                    myPlan={3}
                                    selectedPlan={this.state.selectedPlan}
                                    onPress={(plan) => this.setState({ selectedPlan: plan})}
                                    plans={this.state.plans}
                                    currency={this.state.currency}
                                />

                            </View>

                            <Text allowFontScaling={false} style={{marginHorizontal:scale(30), marginTop:scale(30), fontFamily:'Montserrat-Medium', color:'#5A6885' }} >One on One Interaction</Text>
                            <View style={{height:scale(40), backgroundColor:'#F7F7F7', marginHorizontal:scale(30), marginTop:scale(20), borderRadius:scale(7), flexDirection:'row', justifyContent:'space-around' }} >
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==1?<FilledTick />:<UnfilledTick />}
                                </View>
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==2?<FilledTick />:<UnfilledTick />}
                                </View>
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==3?<FilledTick />:<UnfilledTick />}
                                </View>
                            </View>

                            <Text allowFontScaling={false} style={{marginHorizontal:scale(30), marginTop:scale(30), fontFamily:'Montserrat-Medium', color:'#5A6885' }} >Number of Sessions</Text>
                            <View style={{height:scale(40), backgroundColor:'#F7F7F7', marginHorizontal:scale(30), marginTop:scale(20), borderRadius:scale(7), flexDirection:'row', justifyContent:'space-around' }} >
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    <Text allowFontScaling={false} style={{color: this.state.selectedPlan==1?'#4ca9ee':'#999FA4', backgroundColor:'transparent' , fontFamily:'Montserrat-Medium',fontSize:scale(13)}}>{this.state.plans[1].sessions}</Text>
                                </View>
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    <Text allowFontScaling={false} style={{color: this.state.selectedPlan==2?'#4ca9ee':'#999FA4', backgroundColor:'transparent' , fontFamily:'Montserrat-Medium',fontSize:scale(13)}}>{this.state.plans[2].sessions}</Text>
                                </View>
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    <Text allowFontScaling={false} style={{color: this.state.selectedPlan==3?'#4ca9ee':'#999FA4', backgroundColor:'transparent' , fontFamily:'Montserrat-Medium',fontSize:scale(13)}}>{this.state.plans[3].sessions}</Text>
                                </View>
                            </View>

                            <Text allowFontScaling={false} style={{marginHorizontal:scale(30), marginTop:scale(30), fontFamily:'Montserrat-Medium', color:'#5A6885' }} >Flexible Timings</Text>
                            <View style={{height:scale(40), backgroundColor:'#F7F7F7', marginHorizontal:scale(30), marginTop:scale(20), borderRadius:scale(7), flexDirection:'row', justifyContent:'space-around' }} >
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==1?<FilledTick />:<UnfilledTick />}
                                </View>
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==2?<FilledTick />:<UnfilledTick />}
                                </View>
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==3?<FilledTick />:<UnfilledTick />}
                                </View>
                            </View>

                            <Text allowFontScaling={false} style={{marginHorizontal:scale(30), marginTop:scale(30), fontFamily:'Montserrat-Medium', color:'#5A6885' }} >Personalized Attention</Text>
                            <View style={{height:scale(40), backgroundColor:'#F7F7F7', marginHorizontal:scale(30), marginTop:scale(20), borderRadius:scale(7), flexDirection:'row', justifyContent:'space-around' }} >
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==1?<FilledTick />:<UnfilledTick />}
                                </View>
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==2?<FilledTick />:<UnfilledTick />}
                                </View>
                                <View style={{width:scale(50), backgroundColor:'', height:'100%', justifyContent:'center', alignItems:'center'}} >
                                    {this.state.selectedPlan==3?<FilledTick />:<UnfilledTick />}
                                </View>
                            </View>
                            <View style={{height:scale(70)}} />
                        </View>:<View>

                            <View style={{marginHorizontal:scale(30), borderRadius:scale(10), height:scale(100), backgroundColor:'#4ca9ee', justifyContent:'center', alignItems:'center', marginTop:scale(40)}} >
                                <Text allowFontScaling={false} style={{color: "#fff", fontFamily:'Montserrat-Medium',fontSize:scale(18), marginBottom:scale(5) }}>1 on 1 Session</Text>
                                {this.props.privateSessionsBooked.length?
                                <Text allowFontScaling={false} style={{color: "#fff", fontFamily:'Montserrat-Medium',fontSize:scale(18)}}>
                                    {this.state.currency} {this.state.plans[0].originalPrice}
                                </Text>
                                :
                                <Text allowFontScaling={false} style={{color: "#fff", fontFamily:'Montserrat-Medium',fontSize:scale(18)}}>
                                    {this.state.currency} {this.state.plans[0].firstTimeDiscountedPrice} <Text style={{ textDecorationLine : 'line-through', fontSize:scale(12) }} >{this.state.currency} {this.state.plans[0].originalPrice} </Text>
                                </Text>}
                            </View>

                            {!this.props.privateSessionsBooked || !this.props.privateSessionsBooked.length ? <View style={{height:scale(40), backgroundColor:'white', width:scale(300), alignSelf: 'center', flexDirection:'row'}} >
                                <View style={{flex:1}} />
                                <View style={{flex:1, backgroundColor:'white',justifyContent:'center', alignContent:'center'}} >
                                    <Image source={require('../../../assets/images/forNewUsers.png')} resizeMode="contain" style={{width:'100%', height:'100%'}} />
                                </View>
                            </View>:null}

                                <View style={{flexDirection:'row', marginHorizontal:scale(30), height:scale(30), backgroundColor:'white', marginTop:scale(30), alignItems:'center' }} > 
                                    <View style={{width:scale(30), height:'100%', backgroundColor:'', justifyContent:'center', alignContent:'center', marginLeft:scale(30) }} >
                                        <Image source={require("../../../assets/images/biggerFilledtick.png")} resizeMode="contain" style={{ width:'60%', height:'60%' }} />
                                    </View>
                                    <Text allowFontScaling={false} style={{color: "#999FA4", fontFamily:'Montserrat-Medium',fontSize:scale(15), marginBottom:scale(5) }}>One-on-One Interaction</Text>
                                </View>
                                <View style={{flexDirection:'row', marginHorizontal:scale(30), height:scale(30), backgroundColor:'white', marginTop:scale(20), alignItems:'center' }} > 
                                    <View style={{width:scale(30), height:'100%', backgroundColor:'', justifyContent:'center', alignContent:'center', marginLeft:scale(30) }} >
                                        <Image source={require("../../../assets/images/biggerFilledtick.png")} resizeMode="contain" style={{ width:'60%', height:'60%' }} />
                                    </View>
                                    <Text allowFontScaling={false} style={{color: "#999FA4", fontFamily:'Montserrat-Medium',fontSize:scale(15), marginBottom:scale(5) }}>Flexible Timings</Text>
                                </View>
                                <View style={{flexDirection:'row', marginHorizontal:scale(30), height:scale(30), backgroundColor:'white', marginTop:scale(20), alignItems:'center' }} > 
                                    <View style={{width:scale(30), height:'100%', backgroundColor:'', justifyContent:'center', alignContent:'center', marginLeft:scale(30) }} >
                                        <Image source={require("../../../assets/images/biggerFilledtick.png")} resizeMode="contain" style={{ width:'60%', height:'60%' }} />
                                    </View>
                                    <Text allowFontScaling={false} style={{color: "#999FA4", fontFamily:'Montserrat-Medium',fontSize:scale(15), marginBottom:scale(5) }}>Personalized Attention</Text>
                                </View>
                            </View>}
                        <View style={{height:scale(40)}} />
                    </ScrollView>
                </View> : null}

                
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("from SessionPlan Screen", state.UserReducer.privateSessionsBooked)
    return {
        location : state.UserReducer.location,
        privateSessionsBooked : state.UserReducer.privateSessionsBooked
    }
}

export default connect(mapStateToProps, { updateLocation, addPrivateInfo })(SessionPlan)