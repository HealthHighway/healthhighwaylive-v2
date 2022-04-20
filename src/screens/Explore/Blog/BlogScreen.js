import React, { useEffect, useState } from 'react'
import {View, Text, FlatList, ScrollView, Image, ActivityIndicator} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { scale } from '../../../theme/metric';
import RadioBtnWithHeight from '../../../components/atoms/RadioBtnWithHeight';
import Filters from '../../../components/molecules/Explore/Blog/Filters';
import BlogPreview from '../../../components/molecules/Explore/Blog/BlogPreview';
import { serverConfig } from '../../../constants/server.constants';
import { connect } from 'react-redux';
import Loading from '../../../components/atoms/Loading';
import { useFocusEffect } from '@react-navigation/native';
import { MixpanelInstance } from '../../../utils/analytics.util';

const BlogScreen = (props) => {

    const [blogs, setBlogs] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [refreshing, setRefreshing] = useState(false)
    const [hasFirstTriedBeforeShowingNoData, setHasFirstTriedBeforeShowingNoData] = useState(false)
    const [loading, setLoading] = useState(false)
    
    useFocusEffect(
        React.useCallback(() => {
            setPage(1)
            setBlogs([])
            setRefreshing(false)
            setHasFirstTriedBeforeShowingNoData(false)
            setLoading(true)
            loadBlogsOnFocusOrRefreshOrFilterChange()
        }, [])
    )

    useFocusEffect(
        React.useCallback(() => {
            setPage(1)
            setBlogs([])
            setRefreshing(false)
            setHasFirstTriedBeforeShowingNoData(false)
            setLoading(true)
            loadBlogsOnFocusOrRefreshOrFilterChange()
        }, [props.selectedFilterId])
    )

    const loadBlogsOnFocusOrRefreshOrFilterChange =  async() => {
        try{
            setPage(1)
            setRefreshing(false)
            const response = await fetch(`${serverConfig.BASE_PATH}/blog/`, {
                method: 'POST',
                timeout : 5000,
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    page : 1,
                    limit,
                    filters : props.selectedFilterTitle == "All" || props.selectedFilterTitle == "all" || props.selectedFilterTitle == ""?[]:[props.selectedFilterId],
                    searchQuery : ""
                })
            })
    
            const {data} = await response.json()
            
            setBlogs(data)
            setHasFirstTriedBeforeShowingNoData(true)
            setLoading(false)
            setRefreshing(false)

        }catch(err){
            console.log(err)
            setBlogs([])
            setHasFirstTriedBeforeShowingNoData(true)
            setLoading(false)
            setRefreshing(false)
        }
    }

    const loadMore = async () => {
        try{
            const currentPage = page
            setLoading(true)
            const response = await fetch(`${serverConfig.BASE_PATH}/blog/`, {
                method: 'POST',
                timeout : 5000,
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    page : currentPage+1,
                    limit,
                    filters : props.selectedFilterTitle == "All" || props.selectedFilterTitle == "all" || props.selectedFilterTitle == ""?[]:[props.selectedFilterId],
                    searchQuery : ""
                })
            })
    
            const {data} = await response.json()
            
            setBlogs([...blogs, ...data])
            setHasFirstTriedBeforeShowingNoData(true)
            setLoading(false)
            setRefreshing(false)
            setPage(currentPage+1)

        }catch(err){
            console.log(err)
            setBlogs([])
            setHasFirstTriedBeforeShowingNoData(true)
            setLoading(false)
            setRefreshing(false)

        }
    }

    return (
        <View style={{flex:1, backgroundColor:"#fff"}} >

            <Filters />

            {blogs &&  blogs.length ? <FlatList
                data={blogs}
                keyExtractor={item => item._id}
                refreshing={refreshing}
                onEndReachedThreshold={0.5}
                onRefresh={() => {
                    setRefreshing(true)
                    loadBlogsOnFocusOrRefreshOrFilterChange()
                }}
                onEndReached={(info) => {
                    setLoading(true)
                    loadMore()
                }}
                renderItem={({item}) => {
                    return (
                        <BlogPreview
                            thumbnailImage={item.thumbnailImage}
                            author={item.author}
                            authorImage={item.authorImage}
                            previewText={item.previewText}
                            createdAt={item.createdAt}
                            onPress={() => {
                                MixpanelInstance.track("explore_blog_detail")
                                props.navigation.navigate("BlogDetailScreen")
                            }}
                        />
                    )
                }}
            /> : null}

                {hasFirstTriedBeforeShowingNoData && blogs.length == 0
                ?
                <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}} > 
                    <Image source={require('../../../assets/images/nodata.png')} resizeMode="contain" style={{width:'30%'}} />
                    <Text allowFontScaling={false} style={{color:'#A0D1F6',fontFamily:'Montserrat-Regular',fontSize:scale(14), textAlign:'center'}}>No data for this tag.</Text>
                </View>
                : null}

                {loading ? <Loading /> : null}

        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedFilterTitle : state.BlogReducer.selectedFilterTitle,
        selectedFilterId : state.BlogReducer.selectedFilterId
    }
}

export default connect(mapStateToProps, null)(BlogScreen);