import * as React from "react";
import { Dimensions, View, Text, Image } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { RNCamera } from 'react-native-camera';
import { scale } from "../../theme/metric";
import styles from "../../styles/styles";
import BtnWithoutImage from "../../components/atoms/BtnWithoutImage";
import BackHeaderWithTitleCentered from "../../components/atoms/BackHeaderWithTitleCentered";

class PreviewScreen extends React.Component {

  state={
    granted : true,
    returning : false,
    audioEnabled : true,
    videoEnabled : true
  }

  componentDidMount(){
    SplashScreen.hide()
  }

   render() {
     return (
        <View style={{flex:1, backgroundColor: 'white'}} >
          <View style={{height:scale(40), paddingHorizontal:scale(20), marginTop:scale(20) }} >
            <BackHeaderWithTitleCentered 
                showTitle
                title="Ready to Join?"
                onBackPress={() => this.props.navigation.goBack()}
                showBackBtn={true} />
          </View>
          <View style={{height:scale(20)}} />
          <View style={{width:scale(300), height: Math.round((scale(200) * 16) / 9), backgroundColor:'#C4C4C4', alignSelf: 'center', marginTop:scale(20), borderRadius:scale(7)}} >
            {(this.state.granted && !this.state.returning)
            ?
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{flex:1}}
              type={RNCamera.Constants.Type.front}
              flashMode={RNCamera.Constants.FlashMode.on}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
            :
            <Text allowFontScaling={false} style={{color:'#fff',fontFamily:'Montserrat-Medium',fontSize:scale(18), marginTop:scale(10), alignSelf: 'center'}}>Ready to Join?</Text>}
          </View>

          <View style={{height:scale(50)}} />
          <View style={{height:scale(40), ...styles.rowCenter}}>
              <View style={[{width:scale(100), backgroundColor:'#4CA9EE', height:'100%', borderRadius:scale(7),overflow:'hidden'}, styles.shadowStyle]} >
                  <BtnWithoutImage 
                      onPress = {() => {
                        this.props.navigation.navigate("LiveClassScreen", {
                          channelName : this.props.route.params.channelName
                        })
                      }}
                      title="Join"
                    />
              </View>
          </View>
          <Text allowFontScaling={false} style={{color:'#373232',fontFamily:'Montserrat-Medium',fontSize:scale(12), marginTop:scale(30), alignSelf: 'center', marginHorizontal:scale(40), textAlign:'center'}}>Please adjust the camera as per your convenience</Text>
          <View style={{flex:1}} />
          <View style={{height:scale(30), ...styles.rowCenter,backgroundColor:'white', marginTop:scale(10), alignSelf: 'center'}}>
              <View style={{flex:2}} />
              <View style={{flex:12,backgroundColor:'white',height:'100%',flexDirection:'row',alignItems:'center'}} >
                  <View style={{flex:1,backgroundColor:'white',height:'100%',...styles.rowCenter}} >
                      <Image source={require('../../assets/images/logo.png')} resizeMode="contain" style={{height:'70%', width:'70%'}} />
                  </View>
              </View>
              <View style={{flex:2}} />
          </View>
          <View style={{height:scale(10)}} />
        </View>
     )
   }
}

export default PreviewScreen;