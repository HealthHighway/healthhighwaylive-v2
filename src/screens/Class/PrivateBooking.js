import React from 'react'
import {View, Text, FlatList} from 'react-native'
import Loading from '../../components/atoms/Loading';
import NoSessionBooked from '../../components/atoms/NoSessionBooked';
import PrivateBookingComponent from '../../components/molecules/Booking/PrivateBookingComponent';
import { serverConfig } from '../../constants/server.constants';

class PrivateBooking extends React.Component{

    render(){
        return (
            <View style={{flex:1, backgroundColor:"#fff"}} >

                <FlatList
                    data={this.props.privateSessions}
                    keyExtractor={item=>item._id}
                    renderItem={({item}) => {
                        return (
                            <PrivateBookingComponent {...item} navigation={this.props.navigation} />
                        )
                    }}
                />

            </View>
        )
    }
}

export default PrivateBooking;