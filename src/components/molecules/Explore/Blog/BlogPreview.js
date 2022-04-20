import React from 'react'
import {View, Text, FlatList, ImageBackground, Image, Pressable} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { scale } from '../../../../theme/metric'
import FastImg from '../../../atoms/FastImg'

class BlogPreview extends React.Component {
    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={.95} style={{backgroundColor: '#FBFBFB', marginTop:scale(10)}} >
                <View style={{width:"95%", aspectRatio:16/9, backgroundColor:'white', alignSelf:"center", borderRadius:scale(20), overflow:"hidden"}} >
                    <ImageBackground
                        resizeMode="cover"
                        source={require('../../../../assets/images/loadingImage.jpg')}
                        style={{width:'100%', height:"100%"}}
                        >
                        <Image source={{uri : this.props.thumbnailImage}} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                    </ImageBackground>
                </View>
                <View style={{height : scale(40), flexDirection:'row', margin:scale(10), alignItems:'center'}} >
                    <View style={{width:scale(30), height:scale(30), backgroundColor:'white', borderRadius:scale(100), overflow:'hidden', justifyContent:'center', alignItems:'center'}} >
                        <ImageBackground
                            resizeMode="cover"
                            source={require('../../../../assets/images/loadingImage.jpg')}
                            style={{width:'100%', height:"100%"}}
                            >
                            <Image source={{uri : this.props.authorImage }} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                        </ImageBackground>
                    </View>
                    <View style={{flex:1, justifyContent:'center', flexDirection : "column"}} >
                        <Text allowFontScaling={false} style={{color:'#555B5D',fontFamily:'Montserrat-Semibold',fontSize:scale(14), marginLeft:scale(10)}}>By {this.props.author}</Text>
                        <Text allowFontScaling={false} style={{color:'#B8B5B5',fontFamily:'Montserrat-Regular',fontSize:scale(10), marginLeft:scale(10)}}>Published on {new Date(this.props.createdAt).toDateString()}</Text>
                    </View>
                    <Pressable onPress={() => this.props.handleSharePress()} style={{width:scale(40), backgroundColor:'white', borderRadius:scale(100), overflow:'hidden', justifyContent:'center', alignItems:'center'}} >
                        <Image source={require('../../../../assets/images/share.png')} resizeMode="contain" style={{height:'60%', width:'60%'}} />
                    </Pressable>
                </View>
                <View style={{margin:scale(10), marginTop:scale(0)}} >
                    <Text allowFontScaling={false} style={{color:'#474747',fontFamily:'Montserrat-Regular',fontSize:scale(12), marginHorizontal:scale(5)}}>{this.props.previewText.substring(0, 100)}....<Text style={{color:"#4ca9ee", fontFamily:'Montserrat-SemiBold',fontSize:scale(12)}} >READ MORE</Text></Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default BlogPreview