import React from 'react';
import {View, Text, ImageBackground, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import { scale } from '../../theme/metric';
import { AirbnbRating } from 'react-native-ratings';

class GroupPreview extends React.Component {

    convertTime = () => {
        let time = this.props.timeIn24HrFormat;
        let hr = Number(time.substring(0, 2))
        let min = (time.substring(2, 4))

        if(hr < 12){
            return String(hr).length==1?"0"+hr+":"+min+" AM":hr+":"+min+" AM"
        }else{
            return String(hr-12).length==1?"0"+(hr-12)+":"+min+" PM":hr-12+":"+min+" PM"
        }
    }

    showComingSoon = () => {
        const startingDate = new Date(this.props.startingDate)
        const todayDate = new Date()
        if(todayDate-startingDate>=0) return false
        else return true
    }

    getRating = () => {
        if(this.props.rating && typeof this.props.rating == "object" && this.props.rating["value"] && this.props.rating["frequency"]){
            return this.props.rating.value
        }else{
            return Math.random() * (4) + 1;
        }
    }

    render(){
        return (
            <TouchableOpacity onPress={() => this.props.onPress()} activeOpacity={0.89} style={{width:"95%", alignSelf: "center", borderRadius:scale(10), ...styles.shadowStyle, overflow: "hidden", marginTop:scale(15)}} >
                {(this.props.currentAttendies >= this.props.limitOfAttendies)?<View style={{position:'absolute', top:0,backgroundColor:'red', left:scale(0), zIndex:100, borderRadius:scale(10), paddingHorizontal:scale(10), paddingVertical:scale(4)}} >
                    <Text allowFontScaling={false} style={{color:'#fff',fontFamily:'Montserrat-Regular',fontSize:scale(9)}}>Overbooked</Text>
                </View>:null}

                {this.showComingSoon()?<View style={{position:'absolute', top:0,backgroundColor:'orange', right:scale(0), zIndex:100, borderRadius:scale(10), paddingHorizontal:scale(10), paddingVertical:scale(4)}} >
                    <Text allowFontScaling={false} style={{color:'#fff',fontFamily:'Montserrat-Regular',fontSize:scale(9)}}>{"Starting "+new Date(this.props.startingDate).toDateString().substring(0, 10)}</Text>
                </View>:null}

                <ImageBackground
                    resizeMode="cover"
                    source={require('../../assets/images/loadingImage.jpg')}
                    style={{width:'100%', aspectRatio:16/9}}
                    >
                    <Image source={{uri : this.props.thumbnailImage}} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                </ImageBackground>
                <View style={{height:scale(10), backgroundColor:'white'}} />
                <View style={{flexDirection:'row', backgroundColor:'white', paddingBottom:scale(20)}} >
                    <View style={{flex:2}} >
                        <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-Bold',fontSize:scale(16), marginLeft:scale(10)}}>{this.props.title}</Text>
                        <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Medium',fontSize:scale(9), marginLeft:scale(10), marginTop:scale(8)}}>By {this.props.trainerName}</Text>
                    </View>
                    <View style={{flex:1}} >
                        <View style={{flexDirection:'row', alignItems: 'center'}} >
                            <View style={{width:scale(13), height:scale(13), marginRight:scale(5)}} >
                                <Image source={require('../../assets/images/alarm-clock.png')} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                            </View>
                            <Text allowFontScaling={false} style={{color:'#343434',fontFamily:'Montserrat-Medium',fontSize:scale(12), marginLeft:scale(10)}}>{this.convertTime()}</Text>
                        </View>
                        <View style={{height:scale(8)}} />
                        <AirbnbRating 
                            selectedColor='#29E7CD' 
                            unSelectedColor='#eeeeee' 
                            size={scale(13)} 
                            showRating={false} 
                            count={5}
                            isDisabled={true} 
                            defaultRating={this.getRating()}
                            starContainerStyle={{alignSelf: 'flex-start'}} 
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default GroupPreview;