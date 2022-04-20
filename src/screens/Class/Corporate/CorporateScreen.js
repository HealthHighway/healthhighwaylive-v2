import React from 'react'
import {View, Text, ScrollView, Image, Animated, Easing, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackHeader from '../../../components/atoms/BackHeader';
import BtnWithoutImage from '../../../components/atoms/BtnWithoutImage';
import InputField from '../../../components/atoms/InputField';
import styles from '../../../styles/styles';
import { scale } from '../../../theme/metric';
import DatePicker from 'react-native-date-picker'
import BottomSlider from '../../../components/molecules/Animation/BottomSlider';

class CorporateScreen extends React.Component{

    state = {
        companyName : "",
        location : "",
        noa : "0",
        aim : "",
        time : "070000",
        date : new Date(Date.now() + 24*3600*1000),
        sliderIdToShow : "time",
        showTimeSlider : false,
        showDateSlider : false,
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

        return [String(day).length==1?"0"+day:day, String(month).length==1?"0"+month:month, year]
    }

    render(){
        return (
            <View style={{flex:1}} >

                <ScrollView style={{flex:1, backgroundColor: 'white'}} >
                    <View style={{height:scale(10), backgroundColor : "white"}} />
                    <View style={{height:scale(30),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20)}} >
                        <BackHeader 
                            onBackPress={() => {
                            }} 
                            showBackBtn={true} 
                            showTitle={true} 
                            title="Corporate Yoga" 
                        />
                    </View>
                    
                    <View style={{marginHorizontal : scale(20), marginTop : scale(20)}} >
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginBottom:scale(10), marginTop : scale(20) }}>Organization Name</Text>
                        <View style={{height:scale(60),borderWidth:0}}>
                            <View style={{flex:1}}></View>
                            <View style={{flex:6,flexDirection:'row'}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:100}}>
                                    <InputField 
                                        onChangeText = {value => this.setState({companyName:value})}
                                        value = {this.state.companyName}
                                        placeholderText="type company name" 
                                        legendText="" 
                                        secureTextEntry={false} 
                                        autoFocus={false} 
                                        specificFontSize={14}
                                        hideLeft
                                        // imageUrl={require('../StaticImages/name.png')}
                                        type="default" />
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                            <View style={{flex:1}}></View>
                        </View>
                    </View>

                    <View style={{marginHorizontal : scale(20)}} >
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginBottom:scale(0), marginTop : scale(10) }}>Location</Text>
                        <View style={{height:scale(150),borderWidth:0}}>
                            <View style={{flex:1}}></View>
                            <View style={{flex:6,flexDirection:'row'}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:100}}>
                                    <InputField 
                                        onChangeText = {value => this.setState({location:value})}
                                        value = {this.state.location}
                                        placeholderText="type company's location" 
                                        legendText="" 
                                        secureTextEntry={false} 
                                        autoFocus={false} 
                                        specificFontSize={14}
                                        hideLeft
                                        // imageUrl={require('../StaticImages/name.png')}
                                        type="default" />
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                            <View style={{flex:1}}></View>
                        </View>
                    </View>

                    <View style={{marginHorizontal : scale(20)}} >
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginTop : scale(10) }}>Aim for the Session</Text>
                        <View style={{height:scale(150),borderWidth:0}}>
                            <View style={{flex:1}}></View>
                            <View style={{flex:6,flexDirection:'row'}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:100}}>
                                    <InputField 
                                        onChangeText = {value => this.setState({location:value})}
                                        value = {this.state.location}
                                        placeholderText="type company's location" 
                                        legendText="" 
                                        secureTextEntry={false} 
                                        autoFocus={false} 
                                        specificFontSize={14}
                                        hideLeft
                                        // imageUrl={require('../StaticImages/name.png')}
                                        type="default" />
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                            <View style={{flex:1}}></View>
                        </View>
                    </View>

                    <View style={{marginHorizontal : scale(20)}} >
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginBottom:scale(10), marginTop : scale(10) }}>Number of Attendee</Text>
                        <View style={{height:scale(60),borderWidth:0}}>
                            <View style={{flex:1}}></View>
                            <View style={{flex:6,flexDirection:'row'}}>
                                <View style={{flex:1}}></View>
                                <View style={{flex:100}}>
                                    <InputField 
                                        onChangeText = {value => this.setState({noe:value})}
                                        value = {this.state.noe}
                                        placeholderText="number of employees" 
                                        legendText="" 
                                        secureTextEntry={false} 
                                        autoFocus={false} 
                                        specificFontSize={14}
                                        hideLeft
                                        // imageUrl={require('../StaticImages/name.png')}
                                        type="number-pad" />
                                </View>
                                <View style={{flex:1}}></View>
                            </View>
                            <View style={{flex:1}}></View>
                        </View>
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
                        <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginVertical : scale(10)}}>Date</Text>
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

                    <View style={{height:scale(40), ...styles.rowCenter, marginTop: scale(20)}}>
                        <View style={[{width:scale(160), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                            <BtnWithoutImage 
                                onPress = {() => {
                                }}
                                title="Contact Sales"
                            />
                        </View>
                    </View>
                    
                    <View style={{height:scale(20)}} />

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

                
            </View>
            
        )
    }

}

export default CorporateScreen