import React from 'react'
import {View, Text, Image, Dimensions, FlatList} from 'react-native'
import styles from '../../../../styles/styles'
import { scale } from '../../../../theme/metric'
import BtnWithoutImage from '../../../atoms/BtnWithoutImage'
import {addPrivateInfo} from '../../../../store/actions/privateSession.action'
import { connect } from 'react-redux'
import { MixpanelInstance } from '../../../../utils/analytics.util'

class ListCurated extends React.Component {

    render(){

        return (
            <View style={{height:scale(200)}} >

                <FlatList 
                    style={{marginLeft:scale(15)}} 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    data={this.props.curated}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => {
                        return (
                            <View style={{width : Dimensions.get('window').width * 0.93, backgroundColor:'white',...styles.shadowStyle , borderRadius:scale(12), alignSelf: 'center', flexDirection: 'row', overflow: 'hidden', marginRight:scale(15)}} >
                                <View style={{height:"100%", width : scale(150), borderRadius:scale(12), overflow: 'hidden'}} >
                                    <Image source={item.thumbnailImage?{ uri : item.thumbnailImage }:require("../../../../assets/images/curated.png")} resizeMode="cover" style={{height:'100%', width:'100%'}} />
                                </View>
                                <View style={{ flex:1, backgroundColor : "white", paddingHorizontal:scale(10)}} >
                                    <Text allowFontScaling={false} style={{color:'#4ca9ee',fontFamily:'Montserrat-SemiBold',fontSize:scale(16), marginTop : scale(10) }}>{item.title}</Text>
                                    <Text allowFontScaling={false} style={{color:'#3C4860',fontFamily:'Montserrat-Regular',fontSize:scale(12), marginTop : scale(10) }}>{item.description}</Text>
                                    <View style={{ width : scale(150), height:scale(30), backgroundColor:'red', borderRadius:scale(30), marginTop : scale(15), overflow:'hidden', alignSelf: 'center'}} >
                                        <BtnWithoutImage 
                                            onPress = {() => {
                                                MixpanelInstance.track("select_curated")
                                                this.props.addPrivateInfo({ problem : item.title, curatedId : item._id })
                                                this.props.navigation.navigate("SessionInformation")
                                            }}
                                            title="Book My Class"
                                            fontSize="10"
                                        />
                                    </View>
        
                                </View>
                            </View> 
                        )
                    }}
                />

            </View>
        )
    }
}


export default connect(null, {addPrivateInfo})(ListCurated)