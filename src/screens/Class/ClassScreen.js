import React from 'react';
import {View} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ServiceListingScreen from './ServiceListingScreen';
import MyBookingScreen from './MyBookingScreen';
import { scale } from '../../theme/metric';
import { MixpanelInstance } from '../../utils/analytics.util';

const Tab = createMaterialTopTabNavigator();

class ClassScreen extends React.Component{

    render(){
        return (
            <View style={{flex:1, backgroundColor: 'white'}} >
                    
                <Tab.Navigator 
                    backBehavior="none"
                    lazy={true}
                    swipeEnabled={true}
                    tabBarOptions={{
                        labelStyle: {fontFamily:'Montserrat-SemiBold', fontSize:scale(13)},
                        activeTintColor : "#4ca9ee",
                        inactiveTintColor : "#434546",
                        indicatorStyle : {backgroundColor:"#4ca9ee"}
                    }}
                >
                    <Tab.Screen 
                        name="Book Your Class" 
                        component={ServiceListingScreen} 
                        listeners={{
                            tabPress : e => {
                                MixpanelInstance.track("ServiceListingCardsTab")
                            }
                        }}
                    />
                    <Tab.Screen 
                        name="My Bookings" 
                        component={MyBookingScreen} 
                        listeners={{
                            tabPress : e => {
                                MixpanelInstance.track("MyBookingsTab")
                            }
                        }}
                    />
                </Tab.Navigator>

            </View>
      )
    }
}

export default ClassScreen;