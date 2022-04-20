import React from 'react'
import {View, Text, Image} from 'react-native'
import styles from '../../../../styles/styles'
import { scale } from '../../../../theme/metric'
import { MixpanelInstance } from '../../../../utils/analytics.util'
import BtnWithoutImage from '../../../atoms/BtnWithoutImage'

class BeingCurated extends React.Component {

    state = {
    }

    render(){
        return (
            <View style={{width : "93%", borderRadius : scale(15), aspectRatio : 16/9, marginTop:scale(0), alignSelf:'center'}} >
                <View style={{height:scale(20)}} />
                <View style={{flexDirection:'row', height:scale(100)}} >
                    <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
                        <Image source={require("../../../../assets/images/nobionocurated.png")} resizeMode="contain" style={{width:"120%", height:"100%"}} />
                    </View>
                    <View style={{flex:1, justifyContent:"center" }} >
                        <Text allowFontScaling={false} style={{color:'#474747',fontFamily:'Montserrat-Regular',fontSize:scale(13), marginHorizontal:scale(5)}}>Relax!! Your Session is being curated according to your needs </Text>
                    </View>
                </View>

                <View style={{ width : scale(160), height:scale(40), borderRadius:scale(30), marginTop : scale(10), overflow:'hidden', alignSelf:'center' }} >
                    <BtnWithoutImage 
                        onPress = {() => {
                            MixpanelInstance.track("being_curated")
                            this.props.navigation.navigate("Class")
                        }}
                        title="Explore More!!"
                        fontSize="12"
                    />
                </View>
            </View>
        )
    }
}

export default BeingCurated