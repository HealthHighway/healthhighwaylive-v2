import { ADD_PRIVATE_INFO, LOG_OUT, UPDATE_PRIVATE_SESSIONS_BOOKED } from "../types"

export const addPrivateInfo = (data) => {
    return {
        type : ADD_PRIVATE_INFO, payload : data
    }
}

export const updatePrivateSessionBooked = (data) => {
    // console.log("here came some data>>", data)
    const idList = [];
    data.forEach(ssn => {
        idList.push(ssn._id)
    })
    // console.log("filtered data>>", idList)
    return {
        type : UPDATE_PRIVATE_SESSIONS_BOOKED, payload : idList
    }
}
