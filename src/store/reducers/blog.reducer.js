import { ADD_BLOG_FILTERS, LOG_OUT, SELECT_BLOG_FILTER } from '../types';

const INITIAL_STATE = {
   selectedFilterTitle : "",
   selectedFilterId : "",
   filters : []
}

export default BlogReducer = (state=INITIAL_STATE,actions) => {
    switch(actions.type)
    {
        case ADD_BLOG_FILTERS:
            return {
                ...state, 
                filters : [...actions.payload.filters], 
                selectedFilterTitle : actions.payload.selectedFilterTitle, 
                selectedFilterId : actions.payload.selectedFilterId
            }
        case SELECT_BLOG_FILTER:
            return {
                ...state, 
                selectedFilterTitle : actions.payload.selectedFilterTitle, 
                selectedFilterId : actions.payload.selectedFilterId
            }
        case LOG_OUT:
            return INITIAL_STATE
        default:
            return state;
    }
}

