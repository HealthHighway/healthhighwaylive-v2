import React from 'react'
import {View, Text, Image, Linking} from 'react-native'
import styles from '../../../../styles/styles'
import { scale } from '../../../../theme/metric'
import { MixpanelInstance } from '../../../../utils/analytics.util'
import BtnWithoutImage from '../../../atoms/BtnWithoutImage'

class BoBooked extends React.Component {

    state = {
    }

    render(){
        return (
            <View style={{width : "93%", borderRadius : scale(15), ...styles.shadowStyle, aspectRatio : 16/8.2, alignSelf: 'center', alignItems: 'center', marginTop:scale(6)}} >
                <View style={{height:scale(50), width:scale(50), backgroundColor :"transparent", justifyContent:'center', alignItems: 'center', marginTop:scale(10)}} >
                    <Image source={require("../../../../assets/images/sad.png")} resizeMode="contain" />
                </View>
                <Text allowFontScaling={false} style={{color:'#474747',fontFamily:'Montserrat-Medium',fontSize:scale(13), marginTop : scale(13)}}>You haven’t booked a session yet :( </Text>
                <View style={{ width : scale(160), height:scale(40), backgroundColor:'red', borderRadius:scale(30), marginTop : scale(18), overflow:'hidden' }} >
                    <BtnWithoutImage 
                        onPress = {() => {
                            MixpanelInstance.track("noBooked_upcoming")
                            this.props.navigation.navigate("Class")
                        }}
                        title="Book a session now"
                        fontSize="12"
                    />
                </View>
            </View>
        )
    }
}

export default BoBooked