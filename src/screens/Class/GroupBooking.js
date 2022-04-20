import React from 'react'
import {View, Text, FlatList} from 'react-native'
import Loading from '../../components/atoms/Loading';
import NoSessionBooked from '../../components/atoms/NoSessionBooked';
import GroupBookingComponent from '../../components/molecules/Booking/GroupBookingComponent';
import { serverConfig } from '../../constants/server.constants';

class GroupBooking extends React.Component{

    render(){
        return (
            <View style={{flex:1, backgroundColor:"#fff"}} >

                <FlatList
                    data={this.props.groupSessions}
                    keyExtractor={item=>item._id}
                    renderItem={({item}) => {
                        return (
                            <GroupBookingComponent navigation={this.props.navigation} {...item} />
                        )
                    }}
                />

            </View>
        )
    }
}

export default GroupBooking;