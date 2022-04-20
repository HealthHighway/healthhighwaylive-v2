import React from 'react';
import {View} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UpdateScreen from '../screens/Update/UpdateScreen';
import EntryScreen from '../screens/Entry/EntryScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import UserInfoScreen from '../screens/Auth/UserInfoScreen';
import OtpScreen from '../screens/Auth/OtpScreen';
import BioOnEntry from '../screens/Bio/BioOnEntry';
import { scale } from '../theme/metric';
import TabBarIcon from '../components/atoms/TabBarIcon';
import HomeScreen from '../screens/Home/HomeScreen';
import NotificationScreen from '../screens/Notification/Notification';
import ExploreScreen from '../screens/Explore/ExploreScreen';
import ClassScreen from '../screens/Class/ClassScreen';
import CorporateScreen from '../screens/Class/Corporate/CorporateScreen';
import ProblemScreen from '../screens/Class/Private/ProblemScreen';
import SessionInformation from '../screens/Class/Private/SessionInformation';
import GroupListing from '../screens/Class/Group/GroupListing';
import GroupDetailScreen from '../screens/Class/Group/GroupDetailScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import UpdateBio from '../screens/Bio/UpdateBio';
import BlogDetailScreen from '../screens/Explore/Blog/BlogDetailScreen';
import TncScreen from '../screens/Profile/TncScreen';
import PrivacyPolicyScreen from '../screens/Profile/PrivacyPolicyScreen';
import FaqScreen from '../screens/Profile/FaqScreen';
import { connect } from 'react-redux';
import { updateLocation } from '../store/actions/user.action'
import { getMyLocation } from '../utils/location.util'
import SessionPlan from '../screens/Class/Private/SessionPlan';
import LWCategory from '../screens/Class/Private/LWCategory';
import MCategory from '../screens/Class/Private/MCategory';
import HACategory from '../screens/Class/Private/HACategory';
import GSCategory from '../screens/Class/Private/GSCategory';
import AYCategory from '../screens/Class/Private/AYCategory';
import PrivateCheckOut from '../screens/Class/Private/PrivateCheckOut';
import FeedbackScreen from '../screens/Feedback/FeedbackScreen';
import LiveClassScreen from '../screens/Video/LiveClassScreen';
import PreviewScreen from '../screens/Video/PreviewScreen';
import { upsertFcmToken } from '../utils/fcm.util';
import { MixpanelInstance } from '../utils/analytics.util';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            lazy={true}
            backBehavior="history"
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor : 'rgb(255,255,255)',
                inactiveTintColor : 'rgb(190,190,190)',
                style : {height : scale(50), justifyContent:'center', backgroundColor:'white'},
                allowFontScaling : false,
                keyboardHidesTabBar : true,
                showLabel : false,
            }}
            screenOptions={({route}) => ({
                tabBarIcon : ({focused,size}) => {
                    return (
                    <TabBarIcon 
                        focused={focused} 
                        routeName = {route.name} 
                        focusedBackgroundColor='rgb(234,156,25)' 
                        bluredBackgroundColor='rgb(212,212,212)' 
                        size={size} />
                    )
                },
                tabBarVisible : true,
                tabBarActiveTintColor: '#e91e63',
            })}
            > 
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                listeners={{
                    tabPress : e => {
                        MixpanelInstance.track("home_bottom_tab")
                    }
                }}
            />
            <Tab.Screen 
                name="Explore" 
                component={ExploreScreen} 
                listeners={{
                    tabPress : e => {
                        MixpanelInstance.track("explore_bottom_tab")
                    }
                }}
            />
            <Tab.Screen 
                name="Class" 
                component={ClassScreen} 
                listeners={{
                    tabPress : e => {
                        MixpanelInstance.track("class_bottom_tab")
                    }
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                listeners={{
                    tabPress : e => {
                        MixpanelInstance.track("profile_bottom_tab")
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const LoginFlow = () => {
    return (
        <Stack.Navigator 
            initialRouteName="EntryScreen"
        >
             <Stack.Screen name="EntryScreen" component={EntryScreen} options={{headerShown:false}} />
             <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false }} />
             <Stack.Screen name="UserInfoScreen" component={UserInfoScreen} options={{headerShown:false }} />  
             <Stack.Screen name="OtpScreen" component={OtpScreen} options={{headerShown:false }} />
        </Stack.Navigator>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='BottomTabNavigator' >
            <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} options={{headerShown:false }} />            
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{headerShown:false }} />
            <Stack.Screen name="CorporateScreen" component={CorporateScreen} options={{headerShown:false }} />
            <Stack.Screen name="ProblemScreen" component={ProblemScreen} options={{headerShown:false }} />
            <Stack.Screen name="SessionInformation" component={SessionInformation} options={{headerShown:false }} />
            <Stack.Screen name="GroupListing" component={GroupListing} options={{headerShown:false }} />
            <Stack.Screen name="GroupDetailScreen" component={GroupDetailScreen} options={{headerShown:false }} />
            <Stack.Screen name="UpdateBio" component={UpdateBio} options={{headerShown:false }} />
            <Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} options={{headerShown:false }} />
            <Stack.Screen name="TncScreen" component={TncScreen} options={{headerShown:false }} />
            <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{headerShown:false }} />
            <Stack.Screen name="FaqScreen" component={FaqScreen} options={{headerShown:false }} />
            <Stack.Screen name="SessionPlan" component={SessionPlan} options={{headerShown:false }} />
            <Stack.Screen name="LWCategory" component={LWCategory} options={{headerShown:false }} />
            <Stack.Screen name="MCategory" component={MCategory} options={{headerShown:false }} />
            <Stack.Screen name="HACategory" component={HACategory} options={{headerShown:false }} />
            <Stack.Screen name="GSCategory" component={GSCategory} options={{headerShown:false }} />
            <Stack.Screen name="AYCategory" component={AYCategory} options={{headerShown:false }} />
            <Stack.Screen name="PrivateCheckOut" component={PrivateCheckOut} options={{headerShown:false }} />
            <Stack.Screen name="LiveClassScreen" component={LiveClassScreen} options={{headerShown:false }} />
            <Stack.Screen name="PreviewScreen" component={PreviewScreen} options={{headerShown:false }} />
        </Stack.Navigator>
    )
}

class Routes extends React.Component{

    async componentDidMount() {
        try{
            upsertFcmToken(this.props._id)
            const location = await getMyLocation()
            this.props.updateLocation(location)
        }catch(err){
            console.log(err)
            this.props.updateLocation({})
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps._id != this.props._id){
            upsertFcmToken(this.props._id)
        }
    }

    render(){
        return (
            <NavigationContainer>
                <Tab.Navigator 
                    initialRouteName='UpdateScreen' 
                    lazy
                    backBehavior='none'
                    screenOptions={{
                        tabBarVisible : false
                    }}
                >
                    <Tab.Screen name="UpdateScreen" component={UpdateScreen} options={{headerShown:false }} />
                    <Tab.Screen name="LoginFlow" component={LoginFlow} options={{headerShown:false }} />
                    <Tab.Screen name="BioOnEntry" component={BioOnEntry} options={{headerShown:false }} />
                    <Tab.Screen name="HomeStack" component={HomeStack} options={{headerShown:false}} />
                    <Tab.Screen name="FeedbackScreen" component={FeedbackScreen} options={{headerShown:false }} />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        _id : state.UserReducer._id
    }
}

export default connect(mapStateToProps, {updateLocation})(Routes)