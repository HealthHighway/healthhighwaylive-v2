import React from 'react'
import {View, Text, Dimensions, Image, ToastAndroid} from 'react-native'
import styles from '../../../styles/styles'
import { scale } from '../../../theme/metric'
import BtnWithoutImage from '../../atoms/BtnWithoutImage'
import InfoTag from '../../atoms/InfoTag'

class PrivateBookingComponent extends React.Component {

    state = {   
    }

    componentDidMount(){
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

    handleTitleClick = () => {
        let lastDate = this.props.calendar[this.props.calendar.length-1].fullDate
        if(new Date(lastDate) - new Date() >= 0){
            return {title : "Attend Now", action : () => this.props.navigation.navigate("PreviewScreen", {channelName : this.props._id})}
        }else{
            return {title:"Book Again", action : () => ToastAndroid.show("Please contact us to renew your session", ToastAndroid.SHORT)}
        }
    }

    render(){

        const arr = this.getConvertedTime(this.props.timeIn24HrFormat)

        return (
            <View style={{width : Dimensions.get('window').width * 0.93, backgroundColor:'white',...styles.shadowStyle , borderRadius:scale(12), marginHorizontal : scale(15), alignSelf: 'center', flexDirection: 'row', overflow: 'hidden', marginVertical:scale(6), aspectRatio:16/10}} >
                <View style={{height:"100%", width : scale(150), borderRadius:scale(12), overflow: 'hidden'}} >
                    <Image source={require("../../../assets/images/upcoming.png")} resizeMode="cover" style={{height:'100%', width:'100%'}} />
                </View>
                <View style={{ flex:1, backgroundColor : "white"}} >
                    <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-SemiBold',fontSize:scale(16), marginTop : scale(15), marginLeft : scale(15) }}>Private <Text style={{color:"#29E7CD"}} >Session</Text></Text>
                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(12), marginTop : scale(5), marginLeft : scale(15) }}>Problem/Goal : {this.props.problem}</Text>
                    
                    <View style={{marginLeft : scale(10), marginTop : scale(10)}} >
                        <InfoTag 
                            imageUrl={require("../../../assets/images/alarm-clock.png")} 
                            title={`${arr[0]}:${arr[1]} ${arr[2]}`} 
                            height={20} 
                            marginTop={5} 
                            fontSize="11"
                        />
                    </View>
                    <View style={{marginLeft : scale(10)}} >
                        <InfoTag 
                            imageUrl={require("../../../assets/images/cal-trial.png")} 
                            title={this.props.days.toString()} 
                            height={20} 
                            marginTop={5} 
                            fontSize="11"
                        />
                    </View>

                    <View style={{ width : scale(150), height:scale(30), borderRadius:scale(30), marginTop : scale(20), overflow:'hidden', alignSelf: 'center'}} >
                        <BtnWithoutImage 
                            onPress = {() => this.handleTitleClick().action()}
                            title={this.handleTitleClick().title}
                            fontSize="10"
                        />
                    </View>

                </View>
            </View>           
        )
    }
}

export default PrivateBookingComponent;