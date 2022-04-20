import React from 'react';
import {View, Text, ScrollView, ImageBackground, Image, Animated} from 'react-native';
import { WebView } from "react-native-webview";
import BackHeaderWithTitleCentered from '../../../components/atoms/BackHeaderWithTitleCentered';
import styles from '../../../styles/styles';
import { scale } from '../../../theme/metric';

class BlogDetailScreen extends React.Component {
    render(){
        return (
            <View style={{flex:1, backgroundColor:"white"}} >
                <View style={{height:scale(40),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20), ...styles.shadowStyle}} >
                    <BackHeaderWithTitleCentered onBackPress={() => this.props.navigation.goBack()} showBackBtn={true} showTitle={false} title=""  />
                </View>
                <View style={{height:scale(10)}} />

                <WebView
                    source={{
                        uri : "https://blogsforhh.netlify.app/blogs/what-a-month-long-yoga-can-do-to-your-body/622db2f2b6ab6d2c44f43314/",
                    }}
                    style={[
                        {
                            paddingBottom : 400
                        },
                    ]}
                    onLoad={() => {
                        
                    }}
                />
                

            </View>
        )
    }
}

export default BlogDetailScreen;