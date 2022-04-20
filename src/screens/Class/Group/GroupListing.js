import React from 'react'
import {View, Text, Image, FlatList} from 'react-native'
import { connect } from 'react-redux'
import BackHeaderWithTitleCentered from '../../../components/atoms/BackHeaderWithTitleCentered'
import BtnWithoutImage from '../../../components/atoms/BtnWithoutImage'
import DayRadio from '../../../components/atoms/DayRadio'
import Loading from '../../../components/atoms/Loading'
import BottomSlider from '../../../components/molecules/Animation/BottomSlider'
import GroupFilters from '../../../components/molecules/Class/GroupFilters/GroupFilters'
import GroupPreview from '../../../components/molecules/GroupPreview'
import { serverConfig } from '../../../constants/server.constants'
import styles from '../../../styles/styles'
import { scale } from '../../../theme/metric'
import { selectGroupSession } from '../../../store/actions/groupSession.action'
import { MixpanelInstance } from '../../../utils/analytics.util'

const TIME_RANGE_CONSTANTS = {
    1 : {
        title : "All",
        min : "",
        max : ""
    },
    2 : {
        title : "Before 8 AM",
        min : "000000",
        max : "080000"
    },
    3 : {
        title : "4-6 PM",
        min : "160000",
        max : "180000"
    },
    4 : {
        title : "After 6 PM",
        min : "180000",
        max : "240000"
    }
}

class GroupListing extends React.Component {

    state = {
        shouldShowSlider : false,
        selectedFilterTitle : "",
        selectedFilterId : "",
        page : 1,
        limit : 7,
        loading : false,
        refreshing : false,
        hasFirstTriedBeforeShowingNoData : false,
        groupSessions : [],
        minTimeRange : "",
        maxTimeRange : "",
        selectedTimeFilter : 1
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.selectedFilterId != this.state.selectedFilterId){
            this.setState({
                shouldShowSlider : false, 
                page:1,
                groupSessions : [],
                refreshing : false,
                hasFirstTriedBeforeShowingNoData : false,
                loading : true
            }, () => {
                this.loadGroupSessionsOnFocusOrRefreshOrFilterChange()
            })
        }
    }

    loadGroupSessionsOnFocusOrRefreshOrFilterChange = async () => {
        try{
            const selectedFilterTitle = this.state.selectedFilterTitle
            const response = await fetch(`${serverConfig.BASE_PATH}/groupSession/`, {
                method: 'POST',
                timeout : 5000,
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    page : 1,
                    limit : this.state.limit,
                    filters : selectedFilterTitle == "All" || selectedFilterTitle == "all" || selectedFilterTitle == ""?[]:[this.state.selectedFilterId],
                    timeRange : {
                        min : this.state.minTimeRange,
                        max : this.state.maxTimeRange
                    }
                })
            })
    
            const {data} = await response.json()

            this.setState({
                groupSessions:data,
                hasFirstTriedBeforeShowingNoData : true,
                loading : false,
                refreshing : false
            })

        }catch(err){
            console.log(err)
            this.setState({
                groupSessions:[],
                hasFirstTriedBeforeShowingNoData : true,
                loading : false,
                refreshing : false
            })
        }
    }

    loadMore = async () => {
        try{
            const currentPage = this.state.page
            const selectedFilterTitle = this.state.selectedFilterTitle
            this.setState({ loading: true})
            const response = await fetch(`${serverConfig.BASE_PATH}/groupSession/`, {
                method: 'POST',
                timeout : 5000,
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    page : currentPage+1,
                    limit : this.state.limit,
                    filters : selectedFilterTitle == "All" || selectedFilterTitle == "all" || selectedFilterTitle == ""?[]:[this.state.selectedFilterId],
                    timeRange : {
                        min : this.state.minTimeRange,
                        max : this.state.maxTimeRange
                    }
                })
            })
    
            const {data} = await response.json()

            this.setState({
                groupSessions:[...this.state.groupSessions, ...data],
                hasFirstTriedBeforeShowingNoData : true,
                loading : false,
                refreshing : false,
                page : currentPage+1
            })

        }catch(err){
            console.log(err)
            this.setState({
                groupSessions:[],
                hasFirstTriedBeforeShowingNoData : true,
                loading : false,
                refreshing : false,
                page : 1
            })

        }
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >
                <View style={{height:scale(50),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20), ...styles.shadowStyle}} >
                    <BackHeaderWithTitleCentered onBackPress={() => this.props.navigation.goBack()} showBackBtn={true} showTitle={true} title="Group Sessions"  />
                </View>
    
                <GroupFilters 
                    onFilterChange={(id, title) => {
                        this.setState({
                            selectedFilterTitle : title,
                            selectedFilterId : id
                        })
                    }}
                    onPress={() => this.setState({ shouldShowSlider : true })} 
                />
                
                {this.state.groupSessions && this.state.groupSessions.length ? <FlatList
                    data={this.state.groupSessions}
                    keyExtractor={item => item._id}
                    refreshing={this.state.refreshing}
                    onEndReachedThreshold={0.95}
                    onRefresh={() => {
                        this.setState({ refreshing: true })
                        this.loadGroupSessionsOnFocusOrRefreshOrFilterChange()
                    }}
                    onEndReached={(info) => {
                        this.setState({ loading: true})
                        this.loadMore()
                    }}
                    renderItem={({item}) => {
                        return (
                            <GroupPreview 
                                {...item} 
                                navigation={this.props.navigation} 
                                onPress={() => {
                                    MixpanelInstance.track("group_selected")
                                    this.props.selectGroupSession({...item})
                                    this.props.navigation.navigate("GroupDetailScreen")
                                }}
                            />
                        )
                    }}
                /> : null}
    
                    {this.state.hasFirstTriedBeforeShowingNoData && this.state.groupSessions.length == 0
                    ?
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}} > 
                        <Image source={require('../../../assets/images/nodata.png')} resizeMode="contain" style={{width:'30%'}} />
                        <Text allowFontScaling={false} style={{color:'#A0D1F6',fontFamily:'Montserrat-Regular',fontSize:scale(14), textAlign:'center'}}>No data for this tag.</Text>
                    </View>
                    : null}
    
                    {this.state.loading ? <Loading /> : null}
    
                <BottomSlider 
                    HEIGHT={350}
                    title="Choose Time"
                    shouldShowSlider={this.state.shouldShowSlider} 
                    toggleShouldShowSlider={() => this.setState({ shouldShowSlider:false })} >
                    <View style={{width:"100%", height:"100%"}} >
                        <DayRadio 
                            id={1}
                            selectedTimeFilter={this.state.selectedTimeFilter}
                            TIME_RANGE_CONSTANTS={TIME_RANGE_CONSTANTS}
                            onPress={(min, max) => {
                                this.setState({
                                    selectedTimeFilter:1,
                                    minTimeRange:min,
                                    maxTimeRange:max
                                })
                            }}
                        />
                        <DayRadio 
                            id={2}
                            selectedTimeFilter={this.state.selectedTimeFilter}
                            TIME_RANGE_CONSTANTS={TIME_RANGE_CONSTANTS}
                            onPress={(min, max) => {
                                MixpanelInstance.track("time_select", { type : "Before 8 AM" })
                                this.setState({
                                    selectedTimeFilter:2,
                                    minTimeRange:min,
                                    maxTimeRange:max
                                })
                            }}
                        />
                        <DayRadio 
                            id={3}
                            selectedTimeFilter={this.state.selectedTimeFilter}
                            TIME_RANGE_CONSTANTS={TIME_RANGE_CONSTANTS}
                            onPress={(min, max) => {
                                MixpanelInstance.track("time_select", { type : "4-6 PM" })
                                this.setState({
                                    selectedTimeFilter:3,
                                    minTimeRange:min,
                                    maxTimeRange:max
                                })
                            }}
                        />
                        <DayRadio 
                            id={4}
                            selectedTimeFilter={this.state.selectedTimeFilter}
                            TIME_RANGE_CONSTANTS={TIME_RANGE_CONSTANTS}
                            onPress={(min, max) => {
                                MixpanelInstance.track("time_select", { type : "After 6 PM"})
                                this.setState({
                                    selectedTimeFilter:4,
                                    minTimeRange:min,
                                    maxTimeRange:max
                                })
                            }}
                        />
    
                        <View style={{height:scale(40), ...styles.rowCenter, marginVertical: scale(20), marginTop:scale(20)}}>
                            <View style={[{width:scale(250), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(25),overflow:'hidden'}, styles.shadowStyle]} >
                                <BtnWithoutImage 
                                    onPress = {() => {
                                        this.setState({
                                            shouldShowSlider : false, 
                                            page:1,
                                            groupSessions : [],
                                            refreshing : false,
                                            hasFirstTriedBeforeShowingNoData : false,
                                            loading : true
                                        }, () => {
                                            this.loadGroupSessionsOnFocusOrRefreshOrFilterChange()
                                        })
                                    }}
                                    title="Continue"
                                />
                            </View>
                        </View>
                    </View>
                </BottomSlider>
    
            </View>
            
        )
    }

    
}

export default connect(null, { selectGroupSession })(GroupListing)