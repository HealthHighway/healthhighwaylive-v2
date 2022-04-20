import React, {useState, useEffect} from 'react'
import {View, FlatList, TouchableNativeFeedback, Text} from 'react-native'
import { serverConfig } from '../../../../constants/server.constants'
import styles from '../../../../styles/styles'
import { scale } from '../../../../theme/metric'
import RadioBtnWithHeight from '../../../atoms/RadioBtnWithHeight'
import { connect } from 'react-redux';
import { selectFilterId, addFilters } from '../../../../store/actions/blog.action'

const Filters = (props) => {

    useEffect(() => {

        fetch(`${serverConfig.BASE_PATH}/blogFilter/getAllBlogFilters`)
        .then(res => res.json())
        .then(data => {
            props.addFilters({filters : data.data, selectedFilterTitle : data.data[0].abbr, selectedFilterId : data.data[0]._id })
        })
        .catch(err => {
            props.addFilters({filters : [], selectedFilterTitle : "", selectedFilterId : "" })
        })

    }, [])

    return (
        <View>
            <FlatList style={{paddingTop:scale(15), paddingHorizontal:scale(10), paddingBottom : scale(5)}}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={props.filters}
                keyExtractor={item => item._id}
                ListFooterComponent={<View style={{width:scale(20)}} />}
                renderItem={({item}) => {
                    return <RadioBtnWithHeight 
                                tag={item.abbr} 
                                title={item.abbr} 
                                selected={props.selectedFilterTitle} 
                                onPress={(tag) => {
                                    props.selectFilterId({ selectedFilterTitle : tag, selectedFilterId : item._id })
                                }} 
                                paddingHorizontal="10" 
                                paddingVertical="6" 
                                fontSize="13"  
                            />
                }}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    // console.log("from filters>>", state.BlogReducer.filters, state.BlogReducer.selectedFilterTitle, state.BlogReducer.selectedFilterId)
    return {
        filters : state.BlogReducer.filters,
        selectedFilterTitle : state.BlogReducer.selectedFilterTitle,
        selectedFilterId : state.BlogReducer.selectedFilterId
    }
}

export default connect(mapStateToProps, {selectFilterId, addFilters})(Filters)