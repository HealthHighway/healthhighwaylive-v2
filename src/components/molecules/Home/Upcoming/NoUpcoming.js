import React from 'react'
import {View, Text, Image, Linking} from 'react-native'
import styles from '../../../../styles/styles'
import { scale } from '../../../../theme/metric'
import { MixpanelInstance } from '../../../../utils/analytics.util'
import BtnWithoutImage from '../../../atoms/BtnWithoutImage'

class NoUpcoming extends React.Component {

    state = {
    }

    render(){
        return (
            <View style={{width : "93%", borderRadius : scale(15), aspectRatio : 16/8.2, alignSelf: 'center', alignItems: 'center', marginTop:scale(6)}} >
                <View style={{height:scale(50), width:scale(50), backgroundColor :"transparent", justifyContent:'center', alignItems: 'center', marginTop:scale(10)}} >
                    <Image source={require("../../../../assets/images/no_book_home.png")} resizeMode="contain" />
                </View>
                <Text allowFontScaling={false} style={{color:'#474747',fontFamily:'Montserrat-Medium',fontSize:scale(12), marginTop : scale(13)}}>Relax!! You don't have any class in next 24 hours</Text>
                <View style={{ width : scale(160), height:scale(40), backgroundColor:'red', borderRadius:scale(30), marginTop : scale(18), overflow:'hidden' }} >
                    <BtnWithoutImage 
                        onPress = {() => {
                            MixpanelInstance.track("no_upcoming")
                            Linking.openURL("tel:+919520785339")
                        }}
                        title="Query? Contact here"
                        fontSize="11"
                    />
                </View>
            </View>
        )
    }
}

export default NoUpcoming