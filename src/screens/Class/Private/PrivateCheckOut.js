import React from 'react'
import {View, Text, ScrollView, Image, BackHandler} from 'react-native'
import { connect } from 'react-redux'
import BackHeaderWithTitleCentered from '../../../components/atoms/BackHeaderWithTitleCentered'
import BookingSuccess from '../../../components/atoms/BookingSuccess'
import BtnWithoutImage from '../../../components/atoms/BtnWithoutImage'
import { serverConfig } from '../../../constants/server.constants'
import styles from '../../../styles/styles'
import { scale } from '../../../theme/metric'
import * as RNLocalize from "react-native-localize";
import Loading from '../../../components/atoms/Loading'
import { giveFirstDayLastDate, saveEvents } from '../../../utils/calendar.util'
import BookingFail from '../../../components/atoms/BookingFail'
import { processPayment } from '../../../utils/payment.util'
import { updatePrivateSessionBooked } from '../../../store/actions/privateSession.action'
import { MixpanelInstance } from '../../../utils/analytics.util'

class PrivateCheckOut extends React.Component {

    state = {
        showBookingStatus : false,
        bookedSuccess : false,
        loading : false
    }

    getConvertedTime = (time) => {
        let hr = Number(time.substring(0, 2))
        let min = (time.substring(2, 4))

        let timeArray = [];

        if(hr < 12){
            timeArray.push(String(hr).length==1?"0"+(hr):(hr))
            timeArray.push(min)
            timeArray.push("AM")
            return timeArray
        }else{
            timeArray.push(String(hr-12).length==1?"0"+(hr-12):(hr-12))
            timeArray.push(min)
            timeArray.push("PM")
            return timeArray
        }
    }

    bookPrivateSession = () => {

            MixpanelInstance.track("book_private_clicked")

            this.setState({ loading: true, showBookingStatus : false, bookedSuccess : false}, async () => {

                this.backListener = BackHandler.addEventListener('hardwareBackPress', function() {return true})

                try{
                    
                    const paymentData = await processPayment(this.props.price, this.props.currency, "Payment For 1-on-1 Sessions", this.props.name)

                    const body = {
                        "userId" : this.props._id,
                        "problem" : this.props.problem,
                        "price" : this.props.price,
                        "currency" : this.props.currency,
                        "sessionCount" : this.props.sessionCount,
                        "timeIn24HrFormat" : this.props.timeIn24HrFormat,
                        "days" : this.props.days,
                        "weight" : this.props.weight+" Kgs",
                        "age" : Number(this.props.age),
                        "trainerGenderPreference" : this.props.trainerGenderPreference,
                        "startingDate" : String(this.props.startingDate),
                        "timeZone" : RNLocalize.getTimeZone(),
                        "frontEndOffset" : -(new Date().getTimezoneOffset()),
                        "subCategories" : this.props.subCategories,
                        "curatedId" : this.props.curatedId
                    }

                    // console.log("req.body>>", body)

                    const response = await fetch(`${serverConfig.BASE_PATH}/privateSession/bookPrivateSession`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json'},
                        timeout: 5000,
                        body : JSON.stringify(body)
                    })
                    
                    // console.log("response.status>>", response.status)
                    if(response.status == 200){
                        const {data} = await response.json()
                        // console.log("this is data response>>", data)
                        this.props.updatePrivateSessionBooked([data])
                        let isEventSaved = await saveEvents(data.sessionCount, data.calendar[0].fullDate, giveFirstDayLastDate(data.calendar[0].fullDate), data.calendar[data.calendar.length-1].fullDate, data.days, "Private Yoga Session")
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
                    this.setState({ loading: false, bookedSuccess : false })
                }

                

            })
        
    }

    handleNavigateBackOnResult = () => {
        if(this.backListener)
        {
            this.backListener.remove();
        }
        this.props.navigation.navigate("HomeStack", { screen : "BottomTabNavigator" })
    }

    render(){
        const arr = this.getConvertedTime(this.props.timeIn24HrFormat)
        return(
            <View style={{flex:1}} >
                
                {this.state.loading?<Loading />:null}
                {this.state.showBookingStatus && this.state.bookedSuccess?<BookingSuccess onPress={() => this.handleNavigateBackOnResult()} />:null}
                {this.state.showBookingStatus && !this.state.bookedSuccess?<BookingFail onPress={() => this.handleNavigateBackOnResult()} />:null}

                <ScrollView style={{flex:1, backgroundColor:'#fff'}} >
                    <View style={{height:scale(60),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20), ...styles.shadowStyle}} >
                        <BackHeaderWithTitleCentered onBackPress={() => this.props.navigation.goBack()} showBackBtn={true} showTitle={true} title="Booking Summary"  />
                    </View>
                    <View style={{height:scale(20)}} />

                    <View style={{width:"70%", ...styles.shadowStyle, borderRadius:scale(10), overflow:'hidden', backgroundColor:"#F2F9FF", paddingHorizontal:scale(25), paddingVertical:scale(10), alignSelf:'center'}} >

                        {/* <View style={{width:"70%", alignSelf:'center'}} > */}
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}} >Name</Text> : {this.props.name}</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}} >Gender</Text> : {this.props.trainerGenderPreference}</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}}>Weight</Text> : {this.props.weight} Kgs</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}}>Problem/Goal</Text> : {this.props.problem}</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}} >Sub-Categories</Text> : {this.props.subCategories && this.props.subCategories.length?this.props.subCategories.toString():"General"}</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}} >Starting Date</Text> : {new Date(this.props.startingDate).toLocaleDateString()}</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}} >Time</Text> : {arr[0]} : {arr[1]} {arr[2]}</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}} >Duration</Text> : 60 Mins</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}} >Preferred Days</Text> : {this.props.days.toString()}</Text>
                            <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',marginTop:scale(10), fontSize:scale(11)}}><Text style={{color:"#4ca9ee"}} >No. of Session</Text> : {this.props.sessionCount}</Text>

                        <View style={{marginBottom:scale(20)}} />
                    </View>

                    <View style={{width:"90%", alignSelf:'center', ...styles.rowCenter, height:scale(150), marginTop:scale(20)}} > 
                        <Image source={require("../../../assets/images/private-checkout.png")} resizeMode="contain" style={{height:'100%', width:'100%'}} />
                    </View>

                    <View style={{height:scale(40), ...styles.rowCenter, marginVertical: scale(35)}}>
                        <View style={[{width:scale(200), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                            <BtnWithoutImage 
                                onPress = {() => this.bookPrivateSession()}
                                title={`Pay ${this.props.price} ${this.props.currency}`}
                            />
                        </View>
                    </View>


                </ScrollView>
            </View>
            
        )
    }
}

const mapStateToProps = state => {
    const { problem, 
            price, 
            currency,
            sessionCount, 
            timeIn24HrFormat, 
            days, 
            weight, 
            height,   
            age,  
            trainerGenderPreference, 
            subCategories,
            startingDate,
            curatedId
        } = state.PrivateSessionReducer
    return {
        problem, 
        price, 
        currency,
        sessionCount, 
        timeIn24HrFormat, 
        days, 
        weight, 
        height,   
        age,  
        trainerGenderPreference, 
        subCategories,
        startingDate,
        curatedId,
        name : state.UserReducer.name,
        _id : state.UserReducer._id
    }
}

export default connect(mapStateToProps, { updatePrivateSessionBooked })(PrivateCheckOut)