import React from 'react'
import {View, Text} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BlogScreen from './Blog/BlogScreen';
import SocialScreen from './Social/SocialScreen';
import { scale } from '../../theme/metric';
import { serverConfig } from '../../constants/server.constants';

const Tab = createMaterialTopTabNavigator();

class ExploreScreen extends React.Component {

    render(){
        return (
            <BlogScreen navigation={this.props.navigation} />
        )
    }
}

export default ExploreScreen