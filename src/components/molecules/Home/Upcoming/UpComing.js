import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, TouchableNativeFeedback, FlatList, Dimensions} from 'react-native'
import { scale } from '../../../../theme/metric'
import NoUpcoming from './NoUpcoming'
import NoBooked from './NoBooked'
import ListUpcoming from './ListUpcoming'
import { connect } from 'react-redux'
import { serverConfig } from '../../../../constants/server.constants'
import { updatePrivateSessionBooked } from '../../../../store/actions/privateSession.action'

class Upcoming extends React.Component {

    state = {
        loading : true,
        myTodaysPrivateClasses : [],
        myTodaysGroupClasses : [],
        privateSessionsBooked : [],
        groupSessionsBooked : []
    }

    async componentDidMount() {
        try{
            const response = await fetch(`${serverConfig.BASE_PATH}/user/getAllUpcomingSessions/${this.props._id}`)

            if(response.status == 200){
                const {data} = await response.json()
                // console.log("from upcoming in response", this.props._id)
                this.props.updatePrivateSessionBooked(data.privateSessionsBooked)
                this.setState({
                    myTodaysGroupClasses : data.scheduledGroupSessions?data.scheduledGroupSessions:[], 
                    myTodaysPrivateClasses : data.scheduledPrivateSessions?data.scheduledPrivateSessions:[],
                    privateSessionsBooked : data.privateSessionsBooked?data.privateSessionsBooked:[],
                    groupSessionsBooked : data.groupSessionsBooked?data.groupSessionsBooked:[]
                })
            }else{
                this.setState({ myTodaysGroupClasses : [], myTodaysPrivateClasses : [] })   
            }

        }catch(err){
            console.log(err)
            this.setState({ myTodaysGroupClasses : [], myTodaysPrivateClasses : [] })   
        }
    }

    render(){
        return (
            <View>
                {((this.state.privateSessionsBooked.length) || (this.state.groupSessionsBooked.length)) && (!this.state.myTodaysPrivateClasses.length && !this.state.myTodaysGroupClasses.length) ? <View>
                    <View style={{height:scale(10)}} />
                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginLeft : scale(15), marginBottom:scale(10) }}>My Upcoming Sessions</Text>
                    <NoUpcoming navigation={this.props.navigation} />
                </View> : !this.state.privateSessionsBooked.length && !this.state.groupSessionsBooked.length ? <View>
                    <View style={{height:scale(10)}} />
                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginLeft : scale(15), marginBottom:scale(10) }}>My Upcoming Sessions</Text>
                    <NoBooked navigation={this.props.navigation} />
                </View>:this.state.myTodaysGroupClasses.length || this.state.myTodaysPrivateClasses.length ?<View>
                    <View style={{height:scale(10)}} />
                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginLeft : scale(15), marginBottom:scale(10) }}>My Upcoming Sessions</Text>
                    <ListUpcoming 
                        myTodaysPrivateClasses={this.state.myTodaysPrivateClasses}
                        myTodaysGroupClasses={this.state.myTodaysGroupClasses}
                        navigation={this.props.navigation} 
                    />
                </View>:null}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log("from upcoming>>", state.UserReducer.privateSessionsBooked)
    return {
        _id : state.UserReducer._id
    }
}

export default connect(mapStateToProps, { updatePrivateSessionBooked })(Upcoming)