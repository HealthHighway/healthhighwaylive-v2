import React from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native'
import BackHeaderWithTitleCentered from '../../../components/atoms/BackHeaderWithTitleCentered'
import BtnWithoutImage from '../../../components/atoms/BtnWithoutImage'
import InputField from '../../../components/atoms/InputField'
import styles from '../../../styles/styles'
import { scale } from '../../../theme/metric'
import DatePicker from 'react-native-date-picker'
import BottomSlider from '../../../components/molecules/Animation/BottomSlider'
import DayCheckBox from '../../../components/atoms/DayCheckBox'
import { connect } from 'react-redux'
import { addPrivateInfo } from '../../../store/actions/privateSession.action'
import { MixpanelInstance } from '../../../utils/analytics.util'

const monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}

class SessionInformation extends React.Component {

    state={
        weight : "",
        height : "",
        age : "",
        gender : "Male",
        shouldShowSlider : false,
        time : "070000",
        date : new Date(Date.now() + 24*3600*1000),
        sliderIdToShow : "time",
        showTimeSlider : false,
        showDateSlider : false,
        showDaySlider : false,
        days : new Set()
    }

    returnKeyVal = (key) => {
        return this.props.bio && this.props.bio[key]?this.props.bio[key]:""
    }

    componentDidMount(){
        this.setState({
            age : this.returnKeyVal("age"),
            weight: this.returnKeyVal("weight")
        })
    }

    isAMorPM = () => {
        if(Number(this.state.time.substring(0, 2)) < 12) return "AM"
        else return "PM"
    }

    convertDate = (date) => {
        let temp = new Date(date).toLocaleDateString().split("/")
        let modifiedDate = temp.join('')
        return modifiedDate
    }

    getConvertedTime = () => {
        let time = this.state.time;
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

    getConvertedDate = () => {
        let temp = new Date(this.state.date)
        let day = temp.getDate()
        let month = temp.getMonth()+1
        let year = temp.getFullYear()

        return [String(day).length==1?"0"+day:day, monthMap[month], year]
    }

    handleSessionInformation = () => {
        MixpanelInstance.track("session_information_added")
        if(this.state.days.size && this.state.weight && this.state.age && Number(this.state.weight) > 0 && Number(this.state.weight) < 120 && this.state.age > 0 && this.state.age < 130)
        {
            this.props.addPrivateInfo({
                timeIn24HrFormat : this.state.time,
                days : Array.from(this.state.days),
                weight : this.state.weight,
                age : this.state.age,
                trainerGenderPreference : this.state.gender,
                startingDate : this.state.date
            })
            this.props.navigation.navigate("SessionPlan")
        }else{
            if(!this.state.weight || Number(this.state.weight) < 0 || Number(this.state.weight) > 120){
                ToastAndroid.show("Please enter weight correctly", ToastAndroid.SHORT)
            }else if(!this.state.age || this.state.age < 0 || this.state.age > 130){
                ToastAndroid.show("Please enter age correctly", ToastAndroid.SHORT)
            }else{
                ToastAndroid.show("Please enter days correctly", ToastAndroid.SHORT)
            }
        }
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >

                <ScrollView>
                    <View style={{height:scale(80),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20), ...styles.shadowStyle}} >
                        <BackHeaderWithTitleCentered onBackPress={() => this.props.navigation.goBack()} showBackBtn={true} showTitle={true} title="Private Session"  />
                    </View>
                    <View style={{height:scale(10)}} />

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

                    <Text allowFontScaling={false} style={{color:'#000',fontFamily:'Montserrat-Medium',fontSize:scale(14), marginLeft:scale(20), marginTop:scale(20)}}>Gender</Text>

                    <View style={{flexDirection:'row', height:scale(45), width:"89%", alignSelf:'center', marginTop:scale(15)}} >
                        <TouchableOpacity onPress={() => this.setState({ gender : "Male" })} activeOpacity={0.87} style={{flex:1, ...styles.rowCenter, height:"100%", backgroundColor:this.state.gender=="Male"?'#4ca9ee':'#fff', borderRadius:scale(8), borderWidth:2, borderColor:'#4ca9ee'}} >
                            <Text allowFontScaling={false} style={{color:this.state.gender=="Male"?'#fff':'#4ca9ee',fontFamily:'Montserrat-SemiBold',fontSize:scale(14)}}>Male</Text>
                        </TouchableOpacity>
                        <View style={{width:scale(10)}} />
                        <TouchableOpacity onPress={() => this.setState({ gender : "Female" })} activeOpacity={0.87} style={{flex:1, ...styles.rowCenter, height:"100%", backgroundColor:this.state.gender=="Female"?'#4ca9ee':'#fff', borderRadius:scale(8), borderWidth:2, borderColor:'#4ca9ee'}} >
                            <Text allowFontScaling={false} style={{color:this.state.gender=="Female"?'#fff':'#4ca9ee',fontFamily:'Montserrat-SemiBold',fontSize:scale(14)}}>Female</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{margin : scale(20)}} >
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginVertical : scale(10)}}>Time</Text>
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            style={{height:scale(60),borderWidth:0}} 
                            onPress={() => {
                                console.log("local show time slider!!")
                                this.setState({ showTimeSlider : true }, () => console.log("show time slider now!!"))
                            }} 
                        >
                            <View style={{flex:1}}></View>
                            <View style={{flex:6,flexDirection:'row', backgroundColor:"#E9F6FF"}}>
                                <View style={{flex:0.6}} />
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>{this.getConvertedTime()[0]}</Text>
                                </View>
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>:</Text>
                                </View>
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>{this.getConvertedTime()[1]}</Text>
                                </View>
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>:</Text>
                                </View>
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>{this.getConvertedTime()[2]}</Text>
                                    <View style={{width:scale(15), height:scale(15), ...styles.rowCenter, marginLeft:scale(10)}} >
                                        <Image source={require('../../../assets/images/arrow_down.png')} resizeMode="contain" style={{height:'100%', width:'100%'}}  />
                                    </View>
                                </View>
                                <View style={{flex:0.6}} />
                            </View>
                            <View style={{flex:1}}></View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginHorizontal : scale(20)}} >
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginVertical : scale(10)}}>Starting Date</Text>
                        <TouchableOpacity 
                            activeOpacity={0.7} 
                            style={{height:scale(60),borderWidth:0}} 
                            onPress={() => {
                                console.log("local show date slider!!")
                                this.setState({ showDateSlider : true }, () => console.log("show date slider now!!"))
                            }} 
                        >
                            <View style={{flex:1}}></View>
                            <View style={{flex:6,flexDirection:'row', backgroundColor:"#E9F6FF"}}>
                                <View style={{flex:0.6}} />
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>{this.getConvertedDate()[0]}</Text>
                                </View>
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>:</Text>
                                </View>
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>{this.getConvertedDate()[1]}</Text>
                                </View>
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>:</Text>
                                </View>
                                <View style={{flex:1, ...styles.rowCenter}}>
                                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15)}}>{this.getConvertedDate()[2]}</Text>
                                    <View style={{width:scale(15), height:scale(15), ...styles.rowCenter, marginLeft:scale(10)}} >
                                        <Image source={require('../../../assets/images/arrow_down.png')} resizeMode="contain" style={{height:'100%', width:'100%'}}  />
                                    </View>
                                </View>
                                <View style={{flex:0.6}} />
                            </View>
                            <View style={{flex:1}}></View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginHorizontal : scale(20), marginTop:scale(20)}} >
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start'}}>Days</Text>
                        <TouchableOpacity 
                            activeOpacity={0.87} 
                            style={{width:"100%", ...styles.rowCenter, height:scale(40), backgroundColor:'#E9F6FF', borderRadius:scale(8), alignSelf:'center', marginTop:scale(20)}} 
                            onPress={() => {
                                console.log("local show day slider!!")
                                this.setState({ showDaySlider : true }, () => console.log("show day slider now!!"))
                            }} 
                        >
                            <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(14)}}>{this.state.days.size==0?"Choose Yoga Days":Array.from(this.state.days).toString()}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{height:scale(40), ...styles.rowCenter, marginVertical: scale(20), marginTop:scale(30)}}>
                        <View style={[{width:scale(250), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                            <BtnWithoutImage 
                                onPress = {() => {
                                    this.handleSessionInformation()
                                }}
                                title="Continue"
                            />
                        </View>
                    </View>

                </ScrollView>

                <BottomSlider 
                    HEIGHT={350}
                    title="Choose Time"
                    shouldShowSlider={this.state.showTimeSlider} 
                    toggleShouldShowSlider={() => this.setState({ showTimeSlider : false })} >
                    
                    <DatePicker
                        mode='time'
                        modal={false}
                        open={true}
                        date={new Date(2022, 3, 3, Number((this.state.time).substring(0, 2)), Number((this.state.time).substring(2, 4)), Number((this.state.time).substring(4)) )}
                        onDateChange={(date) => {
                            let temp = new Date(date).toLocaleTimeString().split(":")
                            let modifiedTime = temp.join('')
                            console.log(modifiedTime)
                            this.setState({ time : String(modifiedTime) })
                        }}
                        onConfirm={(date) => {
                            console.log(new Date(date).toLocaleTimeString())
                        }}
                        onCancel={() => {
                            console.log("cancelled")
                        }}
                    />

                </BottomSlider>

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
                            this.setState({ date })
                        }}
                        onConfirm={(date) => {
                            console.log(new Date(date).toLocaleTimeString())
                        }}
                        onCancel={() => {
                            console.log("cancelled")
                        }}
                    />
                    
                </BottomSlider>

                <BottomSlider 
                    HEIGHT={400}
                    title="Choose Yoga Days"
                    shouldShowSlider={this.state.showDaySlider} 
                    toggleShouldShowSlider={() => this.setState({ showDaySlider : false })} >
                    
                    <View style={{width:"100%", height:"100%"}} >
                        <DayCheckBox
                            days={this.state.days}
                            day="Sun"
                            titleDay="Sunday"
                            onPress={(day) => {
                                let temp = this.state.days
                                if(this.state.days.has(day)){
                                    temp.delete(day);
                                    this.setState({days:new Set(temp)})
                                }else{
                                    this.setState({days:new Set(temp).add(day)})
                                }
                            }}
                        />
                        <DayCheckBox
                            days={this.state.days}
                            day="Mon"
                            titleDay="Monday"
                            onPress={(day) => {
                                let temp = this.state.days
                                if(this.state.days.has(day)){
                                    temp.delete(day);
                                    this.setState({days:new Set(temp)})
                                }else{
                                    this.setState({days:new Set(temp).add(day)})
                                }
                            }}
                        />
                        <DayCheckBox
                            days={this.state.days}
                            day="Tue"
                            titleDay="Tuesday"
                            onPress={(day) => {
                                let temp = this.state.days
                                if(this.state.days.has(day)){
                                    temp.delete(day);
                                    this.setState({days:new Set(temp)})
                                }else{
                                    this.setState({days:new Set(temp).add(day)})
                                }
                            }}
                        />
                        <DayCheckBox
                            days={this.state.days}
                            day="Wed"
                            titleDay="Wednesday"
                            onPress={(day) => {
                                let temp = this.state.days
                                if(this.state.days.has(day)){
                                    temp.delete(day);
                                    this.setState({days:new Set(temp)})
                                }else{
                                    this.setState({days:new Set(temp).add(day)})
                                }
                            }}
                        />
                        <DayCheckBox
                            days={this.state.days}
                            day="Thu"
                            titleDay="Thursday"
                            onPress={(day) => {
                                let temp = this.state.days
                                if(this.state.days.has(day)){
                                    temp.delete(day);
                                    this.setState({days:new Set(temp)})
                                }else{
                                    this.setState({days:new Set(temp).add(day)})
                                }
                            }}
                        />
                        <DayCheckBox
                            days={this.state.days}
                            day="Fri"
                            titleDay="Friday"
                            onPress={(day) => {
                                let temp = this.state.days
                                if(this.state.days.has(day)){
                                    temp.delete(day);
                                    this.setState({days:new Set(temp)})
                                }else{
                                    this.setState({days:new Set(temp).add(day)})
                                }
                            }}
                        />
                        <DayCheckBox
                            days={this.state.days}
                            day="Sat"
                            titleDay="Saturday"
                            onPress={(day) => {
                                let temp = this.state.days
                                if(this.state.days.has(day)){
                                    temp.delete(day);
                                    this.setState({days:new Set(temp)})
                                }else{
                                    this.setState({days:new Set(temp).add(day)})
                                }
                            }}
                        />
                    </View>
                    
                </BottomSlider>


            </View>
        )
    }
}

const mapStateToProps = state => {
    console.log("from session information>>>", state.PrivateSessionReducer.problem, state.PrivateSessionReducer.subCategories)
    return {
        _id : state.UserReducer._id,
        problem : state.PrivateSessionReducer.problem,
        subCategories : state.PrivateSessionReducer.subCategories,
        bio : state.UserReducer.bio
    }
}

export default connect(mapStateToProps, { addPrivateInfo })(SessionInformation)