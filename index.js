/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification, {Importance} from "react-native-push-notification";
import Orientation from 'react-native-orientation-locker';
Orientation.lockToPortrait();

PushNotification.createChannel(
{
    channelId: "healthhighway_general",
    channelName: "healthhighway_general",
    channelDescription: "A channel to categorise your notifications",
    playSound: true,
    soundName: "default",
    importance: Importance.HIGH,
    vibrate: true,
},
(created) => {
    console.log(`createChannel returned '${created}'`)
})

PushNotification.configure({
onRegister: function (token) {
    console.log("TOKEN:", token);
},

onNotification: function (notification) {
    console.log("NOTIFICATION:", notification.data ? notification.data.TYPE : "notifications");
},

onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
},

onRegistrationError: function(err) {
    console.error(err.message, err);
},

permissions: {
    alert: true,
    badge: true,
    sound: true,
},

popInitialNotification: true,

requestPermissions: true,

})

AppRegistry.registerComponent(appName, () => App);
 