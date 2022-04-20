import { ADD_NAME, HIDE_FILL_BIO, INITIALIZE_PHONE_FLOW, LOG_OUT, SET_OTP_RESPONSE, UPDATE_LOCATION, UPDATE_PHONE_NUMBER, UPDATE_USER, UPSERT_BIO, USER_ENTRY, VERIFY_OTP } from "../types"
import auth from '@react-native-firebase/auth';
import { serverConfig } from "../../constants/server.constants";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '716392922291-o1ouumrs98vgie5o83q3je479thj8uub.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
})

export const googleAuth = (data) => {
    return async (dispatch) => {
        try{
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            const { email, name, photo } = userInfo.user
            addGmailHandler(dispatch, data._id, email, name, photo)
        }catch(error)
        {
            console.log(error);
            dispatch({type : LOG_OUT})
        }
    }
}

export const updateLocation = (data) => {
    return {
        type : UPDATE_LOCATION, payload : data
    }
}

export const initialisePhoneFlow = () => {
    return {
        type : INITIALIZE_PHONE_FLOW
    }
}

export const initiatePhoneAuth = (data) => {
    return (dispatch) => {
        dispatch({ type : UPDATE_PHONE_NUMBER, payload : data.phoneNumber })
        attachPhoneAuthListener(dispatch, data.phoneNumber)
    }
}

export const manualOtpVerification = (data) => {
    return (dispatch) => {
        otpVerificationHandler(dispatch, data.otpResponse, data.otp)
    }
    
}

export const userEntryViaPhoneNumber = (data) => {
    return (dispatch) => {
        entryWithPhoneNumberHandler(dispatch, data.phoneNumber, data.location)
    }
}

export const addGmail = (data) => {
    return (dispatch) => {
        addGmailHandler(dispatch, data._id, data.gmailAddress, data.name, data.profilePhotoUrl)
    }
}

export const addName = (data) => {
    return (dispatch) => {
        addNameHandler(dispatch, data.name, data._id)
    }
}

export const logout = () => {
    return {
        type : LOG_OUT
    }
}

export const upsertBio = (data) => {
    return {
        type : UPSERT_BIO, payload : data
    }
}

export const hideFillBio = () => {
    return {
        type : HIDE_FILL_BIO
    }
}

export const updateUser = (data) => {
    return {
        type : UPDATE_USER, payload : data
    }
}

const attachPhoneAuthListener = async (dispatch, number) => {
    auth().onAuthStateChanged(async (user) => {
        if(user !== null)
        {
            const user = auth().currentUser
            dispatch({type : VERIFY_OTP })
        }
        else
        {
            console.log("user is null")
        }
    })

    try{
        const response = await auth().signInWithPhoneNumber(number)
        dispatch({type : SET_OTP_RESPONSE, payload : response})
    }catch(err)
    {
        console.log(err)
        dispatch({ type : INITIALIZE_PHONE_FLOW })
    }
}

const otpVerificationHandler = async (dispatch, otpResponse, otp) => {
    try{
        await otpResponse.confirm(otp)
        dispatch({type : VERIFY_OTP})
    }catch(err)
    {
        dispatch({ type : INITIALIZE_PHONE_FLOW})
    }
}

const entryWithPhoneNumberHandler = async (dispatch, phoneNumber, location) => {

    try {
        const response = await fetch(`${serverConfig.BASE_PATH}/user/entryWithPhoneNumber`, {
            method: 'POST',
            timeout:5000,
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                phoneNumber,
                lastEntryLocation : location,
                lastEntryPoint : "App"
            })
        })
        // console.log("response.status>>", response.status)
        if(response.status == 200){
            const {data} = await response.json()
            // console.log("after entry call>>>", data)
            dispatch({ type : USER_ENTRY, payload : data })
        }else{
            dispatch({ type : LOG_OUT })
        }

    }catch(err){
        console.log(err)
        dispatch({ type : LOG_OUT })
    }
}

const addGmailHandler = async (dispatch, _id, gmailAddress, name, profilePhotoUrl) => {
    // console.log("from addGmailHandler>>", _id, gmailAddress, name, profilePhotoUrl)
    try {
        const response = await fetch(`${serverConfig.BASE_PATH}/user/addGoogleOAuth`, {
            method: 'POST',
            timeout:5000,
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                userId : _id,
                gmailAddress,
                name,
                profilePhotoUrl
            })
        })

        // console.log(response.status)
        if(response.status == 200){
            const {data} = await response.json()
            // console.log("data>>", data)
            dispatch({ type : USER_ENTRY, payload : data })
        }else{
            dispatch({ type : LOG_OUT })
        }

    }catch(err){
        console.log(err)
        dispatch({ type : LOG_OUT })
    }
}

const addNameHandler = async (dispatch, name, _id) => {

    try {

        const response = await fetch(`${serverConfig.BASE_PATH}/user/upsertName`, {
            method: 'POST',
            timeout:5000,
            headers: { 'Content-Type': 'application/json'},
            body : JSON.stringify({
                userId : _id,
                name
            })
        })

        // console.log('response.status>>>', response.status)
        if(response.status == 200){
            const {data} = await response.json()
            // console.log("from addNameHandler>>>", data)
            dispatch({ type : ADD_NAME, payload : data})
        }else{
            dispatch({ type : LOG_OUT })
        }

    }catch(err){
        console.log(err)
        dispatch({ type : LOG_OUT })
    }

}