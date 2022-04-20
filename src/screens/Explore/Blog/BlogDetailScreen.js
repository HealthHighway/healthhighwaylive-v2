import React from 'react';
import {View, Text, ScrollView, ImageBackground, Image, Animated} from 'react-native';
import { WebView } from "react-native-webview";
import { connect } from 'react-redux';
import BackHeaderWithTitleCentered from '../../../components/atoms/BackHeaderWithTitleCentered';
import Loading from '../../../components/atoms/Loading';
import { serverConfig } from '../../../constants/server.constants';
import styles from '../../../styles/styles';
import { scale } from '../../../theme/metric';
import {updateUser} from '../../../store/actions/user.action'
class BlogDetailScreen extends React.Component {

    state = {
        loading : true
    }

    toggleLike = async () => {
        this.setState({ loading : true }, async () => {
            try {
                const response = await fetch(`${serverConfig.BASE_PATH}/blog/toggleLikeDislike`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    timeout: 5000,
                    body : JSON.stringify({
                        userId : this.props._id,
                        blogId : this.props.route.params._id
                    })
                })
    
                // console.log(response.status)
                if(response.status == 200){
                    const {data} = await response.json()
                    this.props.updateUser(data)
                    this.setState({ loading:false})
                }
    
            }catch(err){
                console.log(err)
                this.setState({loading:false})
            }
        })
        
    }

    render(){
        return (
            <View style={{flex:1, backgroundColor:"white"}} >
                <View style={{height:scale(40),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20), ...styles.shadowStyle}} >
                    <BackHeaderWithTitleCentered 
                        onLikePress={() => this.toggleLike()}
                        showLikeBtn
                        onBackPress={() => this.props.navigation.goBack()} 
                        showBackBtn={true} 
                        showTitle={false} 
                        title=""  
                        isLiked={this.props.likedBlogs&&this.props.likedBlogs[this.props.route.params._id]?true:false}
                    />
                </View>
                <View style={{height:scale(10)}} />

                {this.state.loading?<Loading />:null}

                <WebView
                    source={{
                        uri : `https://blogs.healthhighway.co.in/mobile/blogs/${this.props.route.params.path}/${this.props.route.params._id}`,
                    }}
                    onLoad={() => {
                        this.setState({loading:false})
                    }}
                />

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        _id : state.UserReducer._id,
        likedBlogs : state.UserReducer.likedBlogs
    }
}

export default connect(mapStateToProps, {updateUser})(BlogDetailScreen)