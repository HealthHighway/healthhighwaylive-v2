import messaging from '@react-native-firebase/messaging';
import { serverConfig } from '../constants/server.constants';

export const getFcmToken = async () => {
    const permission = await messaging().hasPermission()
    try
    {
        if(permission)
        {
            const fcmToken = await messaging().getToken()
            console.log("from getFCMToken : ", fcmToken)
            return fcmToken
        }
        else{
            return null;
        }
    }catch(err){
        console.log("messaging error")
        console.log(err)
        return null
    }
}

export const upsertFcmToken = async (userId) => {
    try{

        const fcmToken = await getFcmToken()

        const response = await fetch(`${serverConfig.BASE_PATH}/fcmToken/upsertFcmToken`, {
            method: 'POST',
            timeout:5000,
            headers : {
                "Content-Type" : "application/json"
            },
            body : userId ? JSON.stringify({
                fcmToken,
                userId
            }):JSON.stringify({
                fcmToken
            })
        })

        if(response.status == 200){
            const {data} = await response.json()
            console.log(data)
        }

    }catch(err){
        console.log(err)
    }
}