import { ADD_BLOG_FILTERS, LOG_OUT, SELECT_BLOG_FILTER, SELECT_GROUP_SESSION } from '../types';

const INITIAL_STATE = {
   _id : "",
   trainerName : "",
   title : "",
   thumbnailImage : "",
   currentAttendies : 0,
   limitOfAttendies : 0,
   description : "",
   advisaryListForSession : [],
   advisaryListAgainstSession : [],
   benefits : [],
   level : "",
   timeIn24HrFormat : "",
   minsPerSession : 50,
   days : [],
   freeDayCountFromSessionBooking : 0,
   startingDate : new Date(),
   hostOffsetFromGMT : 330
}

export default GroupSessionReducer = (state=INITIAL_STATE,actions) => {
    switch(actions.type)
    {   
        case SELECT_GROUP_SESSION:
            return {...state, ...actions.payload}
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
}

