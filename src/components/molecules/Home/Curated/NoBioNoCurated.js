import React from 'react'
import {View, Text, Image} from 'react-native'
import styles from '../../../../styles/styles'
import { scale } from '../../../../theme/metric'
import { MixpanelInstance } from '../../../../utils/analytics.util'
import BtnWithoutImage from '../../../atoms/BtnWithoutImage'

class NoBioNoCurated extends React.Component {

    state = {
    }

    render(){
        return (
            <View style={{width : "93%", borderRadius : scale(15), ...styles.shadowStyle, aspectRatio : 16/9, marginTop:scale(10), alignSelf:'center'}} >
                <View style={{height:scale(20)}} />
                <View style={{flexDirection:'row', height:scale(100)}} >
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
                        <Image source={require("../../../../assets/images/nobionocurated.png")} resizeMode="contain" style={{width:"120%", height:"100%"}} />
                    </View>
                    <View style={{flex:1, justifyContent:"center" }} >
                        <Text allowFontScaling={false} style={{color:'#474747',fontFamily:'Montserrat-Regular',fontSize:scale(13), marginHorizontal:scale(5)}}>It seems like you haven’t filled the bio yet :( </Text>
                    </View>
                </View>

                <View style={{ width : scale(160), height:scale(40), borderRadius:scale(30), marginTop : scale(5), overflow:'hidden', alignSelf:'center' }} >
                    <BtnWithoutImage 
                        onPress = {() => {
                            MixpanelInstance.track("update_bio_curated")
                            this.props.navigation.navigate("UpdateBio")
                        }}
                        title="Let’s Curate"
                        fontSize="12"
                    />
                </View>
            </View>
        )
    }
}

export default NoBioNoCurated