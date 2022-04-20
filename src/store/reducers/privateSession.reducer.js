import { ADD_BLOG_FILTERS, ADD_PRIVATE_INFO, LOG_OUT, PRIVATE_SESSION_BOOKED, SELECT_BLOG_FILTER } from '../types';

const INITIAL_STATE = {
    problem : "", 
    price : 0, 
    currency : "USD",
    sessionCount : 0, 
    bookedOnCalendar : false,
    timeIn24HrFormat : "", 
    days : [], 
    weight : "", 
    height : "",   
    age : 0,  
    trainerGenderPreference : "", 
    subCategories : [], 
    startingDate : new Date(),
    curatedId : ""
}

export default PrivateSessionReducer = (state=INITIAL_STATE,actions) => {
    switch(actions.type)
    {   
        case ADD_PRIVATE_INFO:
            return {...state, ...actions.payload}
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state
    }
}

