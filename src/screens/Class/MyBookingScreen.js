import React from 'react';
import {View} from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../components/atoms/Loading';
import NoSessionBooked from '../../components/atoms/NoSessionBooked';
import BookingFilters from '../../components/molecules/Booking/BookingFilters';
import { serverConfig } from '../../constants/server.constants';
import GroupBooking from './GroupBooking';
import PrivateBooking from './PrivateBooking';

class MyBookingScreen extends React.Component{

    state = {
        loading:false,
        selectedYogaType : "Private Sessions",
        privateSessions : [],
        groupSessions : [],
        retreats : [],
        ttc : []
    }

    componentDidMount(){

        this.setState({ loading : true }, async () => {
            try{
                const response = await fetch(`${serverConfig.BASE_PATH}/user/getAllSessionsBookedYet/${this.props._id}`)
    
                if(response.status == 200){
                    const {data} = await response.json()
                    this.setState({ privateSessions : data.privateSessionsBooked, groupSessions : Object.values(data.groupSessionsBooked), loading:false })
                }else{
                    this.setState({ loading:false })
                }
    
    
            }catch(err){
                console.log(err)
                this.setState({ loading:false })
            }
        })

        
        
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor:"#fff"}} >

                {this.state.loading ? <Loading />:null}

                <BookingFilters
                    selectedYogaType={this.state.selectedYogaType}
                    onPress={item => this.setState({ selectedYogaType : item })}
                />

                {!this.state.loading && this.state.selectedYogaType == "Private Sessions"?<PrivateBooking navigation={this.props.navigation} privateSessions={this.state.privateSessions} />:null}
                {!this.state.loading && this.state.selectedYogaType == "Group Sessions"?<GroupBooking navigation={this.props.navigation} groupSessions={this.state.groupSessions} />:null}
                {!this.state.loading && this.state.selectedYogaType == "Retreats"?<NoSessionBooked retreats={this.state.retreats} onPress={() => {}} />:null}
                {!this.state.loading && this.state.selectedYogaType == "TTC Courses"?<NoSessionBooked ttc={this.state.ttc} onPress={() => {}} />:null}

            </View>
      )
    }
}

const mapStateToProps = state => {
    return {
        _id : state.UserReducer._id
    }
}

export default connect(mapStateToProps, null)(MyBookingScreen)