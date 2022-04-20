import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import { scale } from '../../../../theme/metric';
import GroupUpcoming from './GroupUpcoming';
import PrivateUpcoming from './PrivateUpcoming';

class ListUpcoming extends React.Component {
    render(){
        return (
            <View style={{height:scale(220)}} >
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    {this.props.myTodaysPrivateClasses && this.props.myTodaysPrivateClasses.map(ssn => {
                        return <PrivateUpcoming key={ssn._id} {...ssn} navigation={this.props.navigation} />
                    })}
                    {this.props.myTodaysGroupClasses && this.props.myTodaysGroupClasses.map(ssn => {
                        return <GroupUpcoming key={ssn._id} {...ssn} navigation={this.props.navigation} />
                    })}
                </ScrollView> 
            </View>
                       
        )
    }
}

export default ListUpcoming;