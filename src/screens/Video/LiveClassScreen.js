import * as React from 'react';
import {StyleSheet, View, PermissionsAndroid, ToastAndroid, BackHandler} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {WebView} from 'react-native-webview';
import { connect } from 'react-redux';
import { serverConfig } from '../../constants/server.constants';
import Orientation from 'react-native-orientation-locker';

class LiveClassScreen extends React.Component {

    state = {
        renderWebView: false,
        token : "",
        username : "",
        appid : "",
        error : false
    }

    componentDidMount() {
        this._focuscribe = this.props.navigation.addListener('focus', async () => {
            Orientation.unlockAllOrientations()
            this.backListener = BackHandler.addEventListener('hardwareBackPress', this.handleBackListener)
        })
        this._unsubscribe = this.props.navigation.addListener('blur', () => {
            if(this.backListener)
            {
                this.backListener.remove()
            }
            Orientation.lockToPortrait()
        })
        this.setState({ error:false }, () => {
            this.requestCameraPermission()
        })
    }

    componentWillUnmount() {
        this._unsubscribe();
        this._focuscribe();
    }

    handleBackListener = () => {
        if(this.backListener)
        {
            this.backListener.remove()
        }
        Orientation.lockToPortrait()
        setTimeout(() => {
          this.props.navigation.goBack()
        }, 500)
        return true
      }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ],
                {
                title: 'Health Highway wants to access your camera',
                message: 'Health Highway wants to access your camera to let you enter into live yoga class',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
                },
            )

            this.fetchToken()

        } catch (err) {
        console.warn(err);
        }
    }

    fetchToken = async () => {
        try{
            const response = await fetch(`${serverConfig.BASE_PATH}/video/getToken`, {
                method: 'POST',
                timeout:5000,
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    username : this.props.name,
                    room : this.props.route.params.channelName,
                    isModerator : false
                })
            })
    
            console.log(response.status)
            if(response.status == 200){
                const {data} = await response.json()
                console.log(data)
                const { username, appid, token } = data
                this.setState({ username, appid, token, renderWebView:true })
            }
        }catch(err){
            console.log(err)
            this.setState({ error:true })
        }
        
    }

    render() {
        return (
        <View style={styles.container}>
            {this.state.renderWebView ? (
            <WebView
                style={{backgroundColor:"#000"}}
                userAgent="Mozilla/5.0 (Linux; An33qdroid 10; Android SDK built for x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.185 Mobile Safari/537.36"
                source={{
                uri: `file:///android_asset/jitsimeet.html?token=${this.state.token}&username=${this.state.username}&appid=${this.state.appid}&room=${this.props.route.params.channelName}`,
                }}
                originWhitelist={['*']}
                mediaPlaybackRequiresUserAction={false} // important
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true} // important
                startInLoadingState={true}
                allowUniversalAccessFromFileURLs={true}
                javaScriptEnabled={true}
                clearCache={true}
                useWebKit
                javaScriptCanOpenWindowsAutomatically={true}
                onMessage={(event) => {
                    if(event.nativeEvent.data == "MEETING_LEFT"){
                        ToastAndroid.show("You have left the meeting", ToastAndroid.SHORT)
                        if(this.backListener)
                        {
                            this.backListener.remove()
                        }
                        Orientation.lockToPortrait()
                        setTimeout(() => {
                        this.props.navigation.goBack()
                        }, 500)
                    }
                }}
            />
            ) : null}
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
})

const mapStateToProps = state => {
    return {
        name : state.UserReducer.name
    }
}

export default connect(mapStateToProps, null)(LiveClassScreen)
