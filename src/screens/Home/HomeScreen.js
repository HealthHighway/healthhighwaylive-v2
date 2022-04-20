import React from 'react';
import {View, Text, Image, FlatList, StatusBar, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainHeader from '../../components/atoms/MainHeader';
import Curated from '../../components/molecules/Home/Curated/Curated';
import HomeBanners from '../../components/molecules/Home/Banners/HomeBanners';
import Upcoming from '../../components/molecules/Home/Upcoming/UpComing';
import { scale } from '../../theme/metric';
import Featured from '../../components/molecules/Home/Featured/Featured';
import { connect } from 'react-redux';
import { getMyLocation } from '../../utils/location.util';
import { updateLocation } from '../../store/actions/user.action'
import SplashScreen from 'react-native-splash-screen';

class HomeScreen extends React.Component{

    state = {
    }

    async componentDidMount() {
        SplashScreen.hide()
        if(this.props.location && Object.keys(this.props.location).length){
            return
        }else{
            try{
                const location = await getMyLocation()
                this.props.updateLocation(location)
              }catch(err){
                console.log(err)
                this.props.updateLocation({})
              }
        }
    }

    render(){

        const components = ["1", "2", "3", "4", "5", "6"]

        return (
            <View style={{flex:1, backgroundColor:'#fff'}} >
                <StatusBar backgroundColor="#fff" />
                <FlatList 
                    style={{flex:1, backgroundColor:'#fff'}}
                    data={components}
                    keyExtractor={item => item}
                    renderItem={({item}) => {
                        switch(Number(item)){
                            case 1:
                                return (
                                    <MainHeader 
                                        navigation={this.props.navigation}
                                        photo={this.props.profilePhotoUrl}
                                        name={this.props.name}
                                    />
                                )
                            case 2:
                                return <HomeBanners navigation={this.props.navigation} />
                            case 3:
                                return <Upcoming navigation={this.props.navigation} />
                            case 4:
                                return <Curated navigation={this.props.navigation} />
                            case 5:
                                return <Featured navigation={this.props.navigation} />
                            case 6:
                                return <View style={{height:scale(20)}} />

                        }
                    }}
                />
            </View>
      )
    }
}

const mapStateToProps = (state) => {
    // console.log("from HomeScreen>>>", state.UserReducer.bio)
    return {
        _id : state.UserReducer._id,
        location : state.UserReducer.location,
        name : state.UserReducer.name,
        profilePhotoUrl : state.UserReducer.profilePhotoUrl
    }
}

export default connect(mapStateToProps, {updateLocation})(HomeScreen)