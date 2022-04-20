import React from 'react'
import {View, Text, Dimensions, Image, ToastAndroid} from 'react-native'
import styles from '../../../../styles/styles';
import { scale } from '../../../../theme/metric';
import { MixpanelInstance } from '../../../../utils/analytics.util';
import BtnWithoutImage from '../../../atoms/BtnWithoutImage';
import InfoTag from '../../../atoms/InfoTag';

class GroupUpcoming extends React.Component {

    state = {   
        timeDiffTitle : "Starting soon",
        actualDiff : 15*60*1000
    }

    componentDidMount(){
        this.findTimeDiff()
        this.timeInTerval = setInterval(() => this.findTimeDiff(), 60000)
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

    findTimeDiff = () => {

        let diffInMicroSecs = new Date(this.props.scheduledTime) - new Date()
        let diffInSeconds = diffInMicroSecs / 1000;
        if(diffInSeconds < 60){
            this.setState({ timeDiffTitle : "in " + Math.floor(diffInMinutes)+" secs", actualDiff : diffInMicroSecs })
            return;
        }
        let diffInMinutes = diffInMicroSecs / (60*1000)
        if(diffInMinutes < 60){
            this.setState({ timeDiffTitle : "in " + Math.floor(diffInMinutes)+" mins", actualDiff : diffInMicroSecs })
            return;
        }
        let diffInHours = diffInMinutes / (60)
        this.setState({ timeDiffTitle : "in " + Math.floor(diffInHours)+" hrs", actualDiff : diffInMicroSecs })
        return;

    }

    handleUpcomingSessionClick = () => {
        MixpanelInstance.track("group_upcoming")
        if(this.state.actualDiff > 0 && this.state.actualDiff < 10*60*1000){
            this.props.navigation.navigate("PreviewScreen", {channelName : this.props._id})
        }else{
            ToastAndroid.show("You can only enter 10 mins before the sessin", ToastAndroid.SHORT)
        }
    }

    componentWillUnmount(){
        if(this.timeInTerval){
            clearInterval(this.timeInTerval)
        }
    }

    render(){

        const arr = this.getConvertedTime(this.props.session.timeIn24HrFormat)

        return (
            <View style={{width : Dimensions.get('window').width * 0.93, backgroundColor:'white',...styles.shadowStyle , borderRadius:scale(12), marginHorizontal : scale(15), alignSelf: 'center', flexDirection: 'row', overflow: 'hidden', marginVertical:scale(6)}} >
                <View style={{height:"100%", width : scale(150), borderRadius:scale(12), overflow: 'hidden'}} >
                    <Image source={{ uri : this.props.session.thumbnailImage }} resizeMode="cover" style={{height:'100%', width:'100%'}} />
                </View>
                <View style={{ flex:1, backgroundColor : "white"}} >
                    <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-SemiBold',fontSize:scale(16), marginTop : scale(15), marginLeft : scale(15) }}>{this.props.session.title}</Text>
                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(12), marginTop : scale(5), marginLeft : scale(15) }}>By {this.props.session.trainerName}</Text>
                    
                    <View style={{marginLeft : scale(10), marginTop : scale(10)}} >
                        <InfoTag 
                            imageUrl={require("../../../../assets/images/alarm-clock.png")} 
                            title={`${arr[0]}:${arr[1]} ${arr[2]}`} 
                            height={20} 
                            marginTop={5} 
                            fontSize="11"
                        />
                    </View>
                    <View style={{marginLeft : scale(10)}} >
                        <InfoTag 
                            imageUrl={require("../../../../assets/images/cal-trial.png")} 
                            title={this.props.session.days.toString()} 
                            height={20} 
                            marginTop={5} 
                            fontSize="11"
                        />
                    </View>

                    <View style={{ width : scale(150), height:scale(30), borderRadius:scale(30), marginTop : scale(20), overflow:'hidden', alignSelf: 'center'}} >
                        <BtnWithoutImage 
                            onPress = {() => this.handleUpcomingSessionClick()}
                            title={this.state.actualDiff > -10*60*1000 && this.state.actualDiff < 10*60*1000 ? "Attend now" : this.state.timeDiffTitle}
                            fontSize="10"
                        />
                    </View>

                </View>
            </View>      
        )
    }
}

export default GroupUpcoming;