import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, ImageBackground, Image, TouchableNativeFeedback, FlatList} from 'react-native'
import { serverConfig } from '../../../../constants/server.constants'
import { scale } from '../../../../theme/metric'
import { MixpanelInstance } from '../../../../utils/analytics.util'

class HomeBanners extends React.Component {

    state = {
        banners : []
    }

    componentDidMount() {
        this.fetchBanners();
    }

    fetchBanners = async () => {
        fetch(`${serverConfig.BASE_PATH}/banner/getAll`)
        .then(res => res.json())
        .then(data => this.setState({ banners : data.data }))
        .catch(err => this.setState({ banners : [] }))
    }

    render(){
        return (
            <View>
                <FlatList 
                    // style={{marginLeft:scale(12)}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={this.state.banners}
                    keyExtractor={item => item._id}
                    ListFooterComponent={<View style={{width:scale(10)}} />}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity 
                            onPress={() => {
                                MixpanelInstance.track("home_banner", { type : item.redirectUrl })
                                this.props.navigation.navigate(item.redirectUrl)
                            }}
                            activeOpacity={0.98}
                            style={{width : scale(250), aspectRatio : 16/9, backgroundColor:'white', marginVertical : scale(20), borderRadius : scale(12), overflow:'hidden', marginLeft : scale(12) }} >
                                <ImageBackground
                                    resizeMode="cover"
                                    source={require('../../../../assets/images/loadingImage.jpg')}
                                    style={{width:'100%', height:'100%'}}
                                    >
                                    <Image source={{uri : item.imageUrl}} resizeMode="stretch" style={{height:'100%', width:'100%'}} />
                                </ImageBackground>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            
        )
    }
}

export default HomeBanners