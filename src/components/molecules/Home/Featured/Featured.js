import React from 'react'
import {View, Text, FlatList} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { serverConfig } from '../../../../constants/server.constants'
import { scale } from '../../../../theme/metric'
import { MixpanelInstance } from '../../../../utils/analytics.util'
import BlogPreview from '../../Explore/Blog/BlogPreview'

class Featured extends React.Component {

    state = {
        blogs : []
    }

    componentDidMount() {
        this.fetchFeaturedBlogs()
    }

    fetchFeaturedBlogs = () => {
        fetch(`${serverConfig.BASE_PATH}/blog/getFeatured`, {
            method: 'POST',
            timeout : 5000,
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                page:1,
                limit:10,
            })
        })
        .then(res => res.json())
        .then(data => this.setState({ blogs : data.data }))
        .catch(err => this.setState({ blogs : [] }))
    }

    render(){

        return (
            <View>
                {this.state.blogs.length ? <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
                    <Text allowFontScaling={false} style={{color:'#555555',fontFamily:'Montserrat-SemiBold',fontSize:scale(15), alignSelf:'flex-start', marginTop : scale(20), marginLeft : scale(15), marginBottom:scale(10)}}>Today's Highlights</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Explore')} activeOpacity={0.87} >
                        <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-SemiBold',fontSize:scale(13), alignSelf:'flex-start', marginTop : scale(20), marginRight : scale(15), marginBottom:scale(10)}}>Explore</Text>
                    </TouchableOpacity>
                </View>:null}

                {this.state.blogs.length ? <FlatList
                data={this.state.blogs}
                keyExtractor={item => item._id}
                renderItem={({item}) => {
                    return (
                        <BlogPreview
                            thumbnailImage={item.thumbnailImage}
                            author={item.author}
                            authorImage={item.authorImage}
                            previewText={item.previewText}
                            createdAt={item.createdAt}
                            onPress={() => {
                                MixpanelInstance.track("featured_blog_detail")
                                this.props.navigation.navigate("BlogDetailScreen")
                            }}
                        />
                    )
                }}
            /> : null}

            </View>
        )
    }
}

export default Featured