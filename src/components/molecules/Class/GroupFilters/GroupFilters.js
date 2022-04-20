import React, { useEffect, useState } from 'react'
import {View, FlatList, TouchableOpacity, Image, Text} from 'react-native'
import { serverConfig } from '../../../../constants/server.constants'
import styles from '../../../../styles/styles'
import { scale } from '../../../../theme/metric'
import { MixpanelInstance } from '../../../../utils/analytics.util'
import RadioBtnWithHeight from '../../../atoms/RadioBtnWithHeight'

const GroupFilters = (props) => {

    const [filters, setFilters] = useState([])
    const [selectedFilterTitle, setSelectedFilterTitle] = useState("")
    const [selectedFilterId, setSelectedFilterId] = useState("")

    useEffect(() => {

        fetch(`${serverConfig.BASE_PATH}/groupSessionFilter/getAllGroupSessionFilters`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.data)
            setFilters(data.data)
            setSelectedFilterTitle(data.data[0].abbr)
            setSelectedFilterId(data.data[0]._id)
        })
        .catch(err => {
            console.log(err)
            setFilters([])
            setSelectedFilterTitle("")
            setSelectedFilterId("")
        })

    }, [])

    useEffect(() => {
        props.onFilterChange(selectedFilterId, selectedFilterTitle)
    }, [selectedFilterId])

    return (
        <View>
            {filters.length?<FlatList style={{paddingTop:scale(15), paddingHorizontal:scale(10), paddingBottom : scale(5), marginRight:scale(80)}}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={filters}
                keyExtractor={item => item._id}
                ListFooterComponent={<View style={{width:scale(20)}} />}
                renderItem={({item}) => {
                    return <RadioBtnWithHeight 
                                tag={item.abbr} 
                                title={item.abbr} 
                                selected={selectedFilterTitle} 
                                onPress={(tag) => {
                                    MixpanelInstance.track("group_filter_select")
                                    setSelectedFilterId(item._id)
                                    setSelectedFilterTitle(tag)
                                }} 
                                paddingHorizontal="10" 
                                paddingVertical="6" 
                                fontSize="13"  
                            />
                }}
            />:null}
            {filters.length?<View style={{position: 'absolute', right:0, top:0, bottom:0, width:scale(80), justifyContent:'center', alignItems:'center', ...styles.shadowStyle}} >
                <TouchableOpacity onPress={() => props.onPress()} activeOpacity={0.89} style={{width:scale(80), height:scale(35), borderTopLeftRadius:scale(10), borderBottomLeftRadius:scale(10), flexDirection:'row', alignItems:'center', backgroundColor:'#4ca9ee'}} >
                    <View style={{width:scale(15), height:scale(15), marginLeft:scale(10), ...styles.rowCenter}} >
                        <Image source={require('../../../../assets/images/filter.png')} resizeMode="contain" style={{height:'100%', width:'100%'}} />
                    </View>
                    <Text allowFontScaling={false} style={{color:'#fff',fontFamily:'Montserrat-Medium',fontSize:scale(12), marginLeft:scale(10)}}>Time</Text>
                </TouchableOpacity>
            </View>:null}
        </View>
    )
}

export default GroupFilters