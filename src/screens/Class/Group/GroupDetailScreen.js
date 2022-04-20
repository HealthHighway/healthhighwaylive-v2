import React from 'react'
import {View, Text, Image, ScrollView, ImageBackground, TouchableOpacity, ToastAndroid, BackHandler} from 'react-native'
import BackHeaderWithTitleCentered from '../../../components/atoms/BackHeaderWithTitleCentered'
import BtnWithoutImage from '../../../components/atoms/BtnWithoutImage'
import InfoTag from '../../../components/atoms/InfoTag'
import styles from '../../../styles/styles'
import { scale } from '../../../theme/metric'
import DatePicker from 'react-native-date-picker'
import { connect } from 'react-redux'
import BottomSlider from '../../../components/molecules/Animation/BottomSlider'
import { serverConfig } from '../../../constants/server.constants'
import Loading from '../../../components/atoms/Loading'
import BookingSuccess from '../../../components/atoms/BookingSuccess'
import BookingFail from '../../../components/atoms/BookingFail'
import { processPayment } from '../../../utils/payment.util'
import * as RNLocalize from "react-native-localize";
import {updateUser} from '../../../store/actions/user.action'
import { giveFirstDayLastDate, saveEvents } from '../../../utils/calendar.util'
import { MixpanelInstance } from '../../../utils/analytics.util'

const OverView = (props) => {
    return (
        <View style={{paddingHorizontal:scale(20)}} >
            <View style={{flexDirection:'row', marginTop:scale(20)}} >
                <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}} >
                    <View style={{height:scale(20), width:scale(20), overflow:"hidden"}} >
                        <Image source={require("../../../assets/images/wall-clock.png")} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                    </View>
                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(11), marginLeft:scale(10)}}>{props.convertTime(props.timeIn24HrFormat)}</Text>
                </View>
                {/* <View style={{width:scale(5)}} /> */}
                <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}} >
                    <View style={{height:scale(20), width:scale(20), overflow:"hidden"}} >
                        <Image source={require("../../../assets/images/indi-cal.png")} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                    </View>
                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(11), marginHorizontal:scale(10)}}>Every {props.modifyDays(props.days)}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', marginTop:scale(20)}} >
                <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}} >
                    <View style={{height:scale(20), width:scale(20), overflow:"hidden"}} >
                        <Image source={require("../../../assets/images/Graph.png")} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                    </View>
                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(11), marginLeft:scale(10)}}>{props.level} Level</Text>
                </View>
                {/* <View style={{width:scale(10)}} /> */}
                <View style={{flex:1, backgroundColor: 'white', flexDirection:'row'}} >
                    <View style={{height:scale(20), width:scale(20), overflow:"hidden"}} >
                        <Image source={require("../../../assets/images/toilet.png")} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                    </View>
                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(11), marginHorizontal:scale(10)}}>{props.currentAttendies} People</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', marginTop:scale(20)}} >
                <View style={{flex:1, backgroundColor: 'white', flexDirection:'row'}} >
                    <View style={{height:scale(20), width:scale(20), overflow:"hidden"}} >
                        <Image source={require("../../../assets/images/Duration.png")} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                    </View>
                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(11), marginLeft:scale(10)}}>{props.minsPerSession} Minutes</Text>
                </View>
                {/* <View style={{width:scale(15)}} /> */}
                <View style={{flex:1, backgroundColor: 'white', flexDirection:'row'}} >
                    <View style={{height:scale(20), width:scale(20), overflow:"hidden"}} >
                        <Image source={require("../../../assets/images/badge.png")} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                    </View>
                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(11), marginHorizontal:scale(10)}}>Free Access for {props.freeDayCountFromSessionBooking} days</Text>
                </View>
            </View>

            <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-SemiBold',fontSize:scale(14), marginTop:scale(30)}}>Overview</Text>
            <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(12), marginTop:scale(10)}}>{props.description}</Text>
        </View>
    )
}

const About = (props) => {
    return (
        <View>
            <View style={{marginLeft:scale(20), marginTop:scale(10)}} >
                <InfoTag title={"Suitable/Beneficial for these People"} imageUrl={require("../../../assets/images/Vector.png")} height="30" marginTop="10" marginRight="20"  />
            </View>
            {props.advisaryListForSession.map(point => {
                return <Text key={point} allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Regular',fontSize:scale(12), marginHorizontal:scale(20), marginTop:scale(10) }}>• {point}</Text>
            })}
            <View style={{marginLeft:scale(20), marginTop:scale(10)}} >
                <InfoTag title={"Not Advisable For/ Precautions"} imageUrl={require("../../../assets/images/not.png")} height="30" marginTop="10" marginRight="20"  />
            </View>
            {props.advisaryListAgainstSession.map(point => {
                return <Text key={point} allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Regular',fontSize:scale(12), marginHorizontal:scale(20), marginTop:scale(10) }}>• {point}</Text>
            })}
        </View>
        
    )
}

const Benefits = (props) => {
    return (
        <View style={{marginTop:scale(10)}} >
            {props.benefits.map(point => {
                return <Text key={point} allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Regular',fontSize:scale(12), marginHorizontal:scale(20), marginTop:scale(10) }}>• {point}</Text>
            })}
        </View>
        
    )
}


class GroupDetailScreen extends React.Component {

    state = {
        section : "overview",
        isDateChosen : false,
        isDateModelOpen : false,
        date : new Date(Date.now() + 24*3600*1000),
        showDateSlider:false,
        price : 20,
        currency : "USD",
        isSessionAlreadyBooked : false,
        isSessionFull : false,
        showButton : false,
        showBookingStatus : false,
        bookedSuccess : false,
        loading : false,
        endingDate : null
    }

    componentDidMount(){

        this.setState({ loading : true, showButton:false }, async () => {
            try{

                if(this.backListener)
                {
                    this.backListener.remove();
                }
                const response = await fetch(`${serverConfig.BASE_PATH}/groupSession/sessionDataForUser`, {
                    method: 'POST',
                    timeout:5000,
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body : JSON.stringify({
                        userId : this.props.userId,
                        country : this.props.location&&this.props.location.country?this.props.location.country:"US",
                        groupSessionId : this.props._id
                    })
                })
    
                // console.log(response.status)
                if(response.status == 200){
                    const {data} = await response.json()
                    // console.log(data)
                    const {price, currency, isSessionAlreadyBooked, isSessionFull, endingDate} = data
                    this.setState({ price, currency, isSessionAlreadyBooked, isSessionFull, endingDate, showButton : true, loading : false })
                }
    
            }catch(err){
                console.log(err)
            }
        })

    }

    convertTime = (time) => {
        let hr = Number(time.substring(0, 2))
        let min = (time.substring(2, 4))
    
        if(hr < 12){
            return String(hr).length==1?"0"+hr+":"+min+" AM":hr+":"+min+" AM"
        }else{
            return String(hr-12).length==1?"0"+(hr-12)+":"+min+" PM":hr-12+":"+min+" PM"
        }
    }

    modifyDays = (days) => {
        const temp = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        if(JSON.stringify(temp)==JSON.stringify(days)) return "Mon-Sat"
        else return days.toString()
    }

    enrollingButtonAction = () => {

        if(this.state.isSessionAlreadyBooked){
            if(new Date(this.state.endingDate) - new Date() >= 0){
                return { title : "Already Enrolled", action : () => ToastAndroid.show("Relax, You are already enrolled in this session. Go to Booking Section to attend", ToastAndroid.SHORT) }
            }else{
                return { title : `Re-book for ${this.state.currency} ${this.state.price}`, action : () => {
                    if(!this.state.isDateChosen){
                        ToastAndroid.show("Choose the Starting Date First!!", ToastAndroid.SHORT)
                    }else{
                        this.bookGroupSession(24)
                    }
                }}
            }
        }else if(this.state.isSessionFull){
            return { title : "Session Overbooked", action : () => ToastAndroid.show("Session is Overbooked", ToastAndroid.SHORT) }
        }else if(new Date(this.props.startingDate) - new Date() > 0){
            return { title : "Starting Soon", action : () => ToastAndroid.show("Session will start from "+new Date(this.props.startingDate).toDateString(), ToastAndroid.SHORT) }
        }else if(this.state.price == 0){
            return { title : "Book for free", action : () => this.bookGroupSession(1)}
        }else{
            return { title : `Pay ${this.state.currency} ${this.state.price}`, action : () => this.bookGroupSession(24)}
        }
    }

    selectStartDateButtonAction = () => {
        if(this.state.isSessionFull || (new Date(this.props.startingDate) - new Date() > 0)){
            return { disabled : true }
        }else {
            return { disabled : false }
        }
    }

    handleNavigateBackOnResult = () => {
        if(this.backListener)
        {
            this.backListener.remove();
        }
        this.props.navigation.navigate("HomeStack", { screen : "BottomTabNavigator" })
    }

    toggleLike = async () => {
        this.setState({ loading : true }, async () => {
            try {
                const response = await fetch(`${serverConfig.BASE_PATH}/groupSession/toggleLikeDislike`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    timeout: 5000,
                    body : JSON.stringify({
                        userId : this.props.userId,
                        groupSessionId : this.props._id
                    })
                })
    
                // console.log(response.status)
                if(response.status == 200){
                    const {data} = await response.json()
                    this.props.updateUser(data)
                    this.setState({ loading:false})
                }
    
            }catch(err){
                console.log(err)
                this.setState({loading:false})
            }
        })
        
    }

    bookGroupSession = (sessionCount) => {

        if(!this.state.isDateChosen){
            ToastAndroid.show("Choose the Starting Date First!!", ToastAndroid.SHORT)
            return;
        }

        MixpanelInstance.track("book_group_clicked")

        this.setState({ loading: true, showBookingStatus : false, bookedSuccess : false}, async () => {

            this.backListener = BackHandler.addEventListener('hardwareBackPress', function() {return true})

            try{
                
                if(this.state.price){
                    const paymentData = await processPayment(this.state.price, this.state.currency, "Payment For Group Sessions", this.props.name)
                }

                const body = {
                    "userId" : this.props.userId,
                    "price" : this.state.price,
                    "groupSessionId" : this.props._id,
                    "sessionCount" : sessionCount,
                    "startingDate" : new Date(this.state.date).toString(),
                    "timeZone" : RNLocalize.getTimeZone(),
                    "frontEndOffset" : -(new Date().getTimezoneOffset()),
                    "currency" : this.state.currency
                }
                // console.log("req.body>>", body)
                const response = await fetch(`${serverConfig.BASE_PATH}/groupSession/bookGroupSession`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    timeout: 5000,
                    body : JSON.stringify(body)
                })
                
                // console.log("response.status>>", response.status)
                if(response.status == 200){
                    const {data} = await response.json()
                    // console.log("this is data response>>", data)
                    this.props.updateUser(data)
                    let isEventSaved = await saveEvents(data.groupSessionsBooked[this.props._id].calendar.length, data.groupSessionsBooked[this.props._id].calendar[0].fullDate, giveFirstDayLastDate(data.groupSessionsBooked[this.props._id].calendar[0].fullDate), data.groupSessionsBooked[this.props._id].calendar[data.groupSessionsBooked[this.props._id].calendar.length-1].fullDate, this.props.days, "Group Yoga Session")
                    this.setState({ loading: true, bookedSuccess : true, showBookingStatus : true })
                }else{
                    this.setState({ loading: false, bookedSuccess : false, showBookingStatus : true })
                }
            }catch(err){
                console.log(err)
                if(this.backListener)
                {
                    this.backListener.remove();
                }
                this.setState({ loading: false, bookedSuccess : false, showBookingStatus : true })
            }

        })
}

    render(){
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >

                {this.state.loading?<Loading />:null}
                {this.state.showBookingStatus && this.state.bookedSuccess?<BookingSuccess onPress={() => this.handleNavigateBackOnResult()} />:null}
                {this.state.showBookingStatus && !this.state.bookedSuccess?<BookingFail onPress={() => this.handleNavigateBackOnResult()} />:null}

                <ScrollView style={{flex:1}} >
                    <View style={{height:scale(50),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20), ...styles.shadowStyle}} >
                        <BackHeaderWithTitleCentered 
                            onBackPress={() => this.props.navigation.goBack()} 
                            showBackBtn={true} 
                            showTitle={true} 
                            title={this.props.title}  
                            showLikeBtn
                            onLikePress={() => this.toggleLike()}
                            isLiked={this.props.likedGroupSessions&&this.props.likedGroupSessions[this.props._id]?true:false}
                        />
                    </View>

                    <View style={{height:scale(15)}} />
                    <ImageBackground
                        resizeMode="cover"
                        source={require('../../../assets/images/loadingImage.jpg')}
                        style={{width:'94%', aspectRatio:16/9, overflow:"hidden", borderRadius:scale(10), alignSelf:'center'}}
                        >
                        <Image source={{uri : this.props.thumbnailImage}} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                    </ImageBackground>

                    <View style={{height:scale(20)}} />
                    <View style={{width:"90%", alignSelf:'center', height:scale(60), borderRadius:scale(20), backgroundColor:"#F2F9FF", flexDirection:'row', alignItems:'center'}} >
                        <View style={{width:scale(20)}} />
                        <View style={{height:scale(40), width:scale(40), borderRadius:scale(40), overflow:"hidden"}} >
                            <Image source={{uri : "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHlvZ2F8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                        </View>
                        <View style={{width:scale(6)}} />
                        <View style={{flex:1}} >
                            <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(11), marginLeft:scale(10)}}>Trainer</Text>
                            <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Medium',fontSize:scale(14), marginLeft:scale(10), marginTop:scale(2)}}>{this.props.trainerName}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection:'row', marginTop:scale(20), marginHorizontal:scale(20)}} >
                        <TouchableOpacity onPress={() => this.setState({ section:"overview" })} style={{marginRight:scale(10)}} >
                            <Text allowFontScaling={false} style={{color:this.state.section=="overview"?'#4ca9ee':'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginLeft:scale(10)}}>{this.state.section=="overview"?'Overview •':'Overview'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ section:"about" })} style={{marginRight:scale(10)}} >
                            <Text allowFontScaling={false} style={{color:this.state.section=="about"?'#4ca9ee':'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginLeft:scale(10)}}>{this.state.section=="about"?'About •':'About'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ section:"benefits" })} style={{marginRight:scale(10)}} >
                            <Text allowFontScaling={false} style={{color:this.state.section=="benefits"?'#4ca9ee':'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(15), marginLeft:scale(10)}}>{this.state.section=="benefits"?'Benefits •':'Benefits'}</Text>
                        </TouchableOpacity>
                    </View>

                    {this.state.section == "overview" ? <OverView {...this.props} convertTime={this.convertTime} modifyDays={this.modifyDays} /> : this.state.section == "about" ? <About {...this.props} /> : <Benefits {...this.props} />}

                    {this.state.showButton?
                    <View style={{flexDirection:'row', height:scale(40), marginTop:scale(30), justifyContent:'center', marginHorizontal:scale(20)}} >
                        <View style={[{flex:1.2, backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                            <BtnWithoutImage 
                                disabled={this.selectStartDateButtonAction().disabled}
                                fontSize="11"
                                backgroundColor={this.selectStartDateButtonAction().disabled?"#9E9E9E":"orange"}
                                onPress = {() => this.setState({ showDateSlider : true, isDateChosen : true})}
                                title={"Choose Starting Date"}
                            />
                        </View>
                        <View style={{width:scale(10)}} />
                        <View style={[{flex:1, backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                            <BtnWithoutImage 
                                fontSize="11"
                                onPress = {() => this.enrollingButtonAction().action()}
                                title={this.enrollingButtonAction().title}
                                // title={this.state.isDateChosen?"Pay INR 799":"Choose starting Date"}
                            />
                        </View>
                    </View>:null}

                    {/* {this.state.showButton?<View style={{height:scale(40), ...styles.rowCenter, marginTop:scale(30)}}>
                        <View style={[{width:scale(250), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                            <BtnWithoutImage 
                                onPress = {() => this.enrollingButtonAction().action()}
                                title={this.enrollingButtonAction().title}
                                // title={this.state.isDateChosen?"Pay INR 799":"Choose starting Date"}
                            />
                        </View>
                    </View>:null} */}

                    {/* {this.state.isDateChosen?<Text allowFontScaling={false} style={{color:'orange',fontFamily:'Montserrat-Regular',fontSize:scale(11), alignSelf:'center', marginTop:scale(10), marginBottom:scale(20)}}>Start on {new Date(this.state.date).toDateString()}</Text>:null} */}

                    <View style={{height:scale(40)}} />

                </ScrollView>

                <BottomSlider 
                    HEIGHT={350}
                    title="Choose Date"
                    shouldShowSlider={this.state.showDateSlider} 
                    toggleShouldShowSlider={() => this.setState({ showDateSlider : false })} >
                    
                    <DatePicker
                        mode='date'
                        modal={false}
                        open={true}
                        date={this.state.date}
                        onDateChange={(date) => {
                            this.setState({ date, isDateChosen : true })
                        }}
                        onConfirm={(date) => {
                            console.log(new Date(date).toLocaleTimeString())
                        }}
                        onCancel={() => {
                            console.log("cancelled")
                        }}
                    />
                    
                </BottomSlider>
                

            </View>
            
        )
    }
}

const mapStateToProps = (state) => {
    const {
        _id,
        trainerName,
        title,
        thumbnailImage,
        currentAttendies,
        limitOfAttendies,
        description,
        advisaryListForSession,
        advisaryListAgainstSession,
        benefits,
        level,
        timeIn24HrFormat,
        minsPerSession,
        days,
        freeDayCountFromSessionBooking,
        startingDate,
        hostOffsetFromGMT
    } = state.GroupSessionReducer;
    // console.log("inside group detail mapstate>>>", _id, trainerName, title);
    return {
        _id,
        trainerName,
        title,
        thumbnailImage,
        currentAttendies,
        limitOfAttendies,
        description,
        advisaryListForSession,
        advisaryListAgainstSession,
        benefits,
        level,
        timeIn24HrFormat,
        minsPerSession,
        days,
        freeDayCountFromSessionBooking,
        startingDate,
        hostOffsetFromGMT,
        location : state.UserReducer.location,
        userId : state.UserReducer._id,
        name : state.UserReducer.name,
        likedGroupSessions : state.UserReducer.likedGroupSessions
    }
}

export default connect(mapStateToProps, {updateUser})(GroupDetailScreen);