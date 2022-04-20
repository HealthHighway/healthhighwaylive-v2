import { LOG_OUT, UPDATE_LOCATION, INITIALIZE_PHONE_FLOW, VERIFY_OTP, UPDATE_PHONE_NUMBER, SET_OTP_RESPONSE, USER_ENTRY, ADD_NAME, UPDATE_PRIVATE_SESSIONS_BOOKED, UPSERT_BIO, HIDE_FILL_BIO, UPDATE_USER } from '../types';

const INITIAL_STATE = {
   _id : "",
   name : "",
   phoneNumber : "",
   gmailAddress : "",
   profilePhotoUrl : "",
   bio : {},
   likedBlogs : {},
   likedSocials : {},
   location : {},
   likedGroupSessions : {},
   isOtpVerified : false,
   otpResponse : null,
   privateSessionsBooked : [],
   freeSessionsAvailed : 0,
   showBioToFill : true
}

export default UserReducer = (state=INITIAL_STATE,actions) => {
    switch(actions.type)
    {
        case USER_ENTRY:
            return {...state, ...actions.payload}
        case UPDATE_LOCATION:
            return {...state, location : actions.payload}
        case INITIALIZE_PHONE_FLOW:
            return {...state, phoneNumber : "", isOtpVerified : false}
        case UPDATE_PHONE_NUMBER:
            return {...state, phoneNumber : actions.payload, isOtpVerified : false}
        case SET_OTP_RESPONSE:
            return {...state, otpResponse : actions.payload}
        case VERIFY_OTP:
            return {...state, isOtpVerified : true}
        case ADD_NAME:
            return {...state, ...actions.payload}
        case UPDATE_PRIVATE_SESSIONS_BOOKED:
            return {...state, privateSessionsBooked : actions.payload}
        case UPSERT_BIO:
            return {...state, bio : actions.payload}
        case HIDE_FILL_BIO:
            return {...state, showBioToFill : false}
        case UPDATE_USER:
            return {...state, ...actions.payload}
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
}

