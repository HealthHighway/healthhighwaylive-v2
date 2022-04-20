import React from 'react'
import {View, FlatList} from 'react-native'
import { scale } from '../../../theme/metric'
import RadioBtnWithHeight from '../../atoms/RadioBtnWithHeight'

const tagFilterData = ["Private Sessions", "Group Sessions", "Retreats", "TTC Courses"]

class BookingFilters extends React.Component {
    render(){
        return (
            <View>
                <FlatList 
                    style={{paddingTop:scale(15), paddingHorizontal:scale(10), paddingBottom : scale(5)}}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={tagFilterData}
                    keyExtractor={item => item}
                    ListFooterComponent={<View style={{width:scale(20)}} />}
                    renderItem={({item}) => {
                        return <RadioBtnWithHeight 
                                tag={item} 
                                title={item} 
                                selected={this.props.selectedYogaType} 
                                onPress={(tag) => this.props.onPress(tag)} 
                                paddingHorizontal="10" 
                                paddingVertical="6" 
                                fontSize="13"  
                            />
                    }}
                />
            </View>
        )
    }
}

export default BookingFilters