import React from 'react'
import {View, Text, FlatList, Image} from 'react-native'
import BtnWithoutImage from '../../components/atoms/BtnWithoutImage';
import Loading from '../../components/atoms/Loading';
import NoSessionBooked from '../../components/atoms/NoSessionBooked';
import PrivateBookingComponent from '../../components/molecules/Booking/PrivateBookingComponent';
import { serverConfig } from '../../constants/server.constants';
import { scale } from '../../theme/metric';

class PrivateBooking extends React.Component{

    render(){
        return (
            <View style={{flex:1, backgroundColor:"#fff"}} >

                {this.props.privateSessions && this.props.privateSessions.length ? <FlatList
                    data={this.props.privateSessions}
                    keyExtractor={item=>item._id}
                    renderItem={({item}) => {
                        return (
                            <PrivateBookingComponent {...item} navigation={this.props.navigation} />
                        )
                    }}
                />:null}

                {!this.props.privateSessions || !this.props.privateSessions.length ? 
                <View style={{flex:1, justifyContent:"center", alignItems:"center"}} >
                    <View style={{height:scale(50), width:scale(50), backgroundColor :"transparent", justifyContent:'center', alignItems: 'center', marginTop:scale(10)}} >
                        <Image source={require("../../assets/images/sad.png")} resizeMode="contain" />
                    </View>
                    <Text allowFontScaling={false} style={{color:'#474747',fontFamily:'Montserrat-Medium',fontSize:scale(13), marginTop : scale(13)}}>You haven’t booked a session yet :( </Text>
                    <View style={{ width : scale(160), height:scale(40), backgroundColor:'white', borderRadius:scale(30), marginTop : scale(18), overflow:'hidden' }} >
                        <BtnWithoutImage 
                            onPress = {() => {}}
                            title="Book a session now"
                            fontSize="12"
                        />
                    </View>
                </View>
                :null}

            </View>
        )
    }
}

export default PrivateBooking;