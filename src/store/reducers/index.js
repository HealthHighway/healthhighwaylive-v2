import { combineReducers } from 'redux';
import BlogReducer from './blog.reducer';
import GroupSessionReducer from './groupSession.reducer';
import UserReducer from './user.reducer';
import PrivateSessionReducer from './privateSession.reducer';

export default combineReducers({
    BlogReducer,
    GroupSessionReducer,
    UserReducer,
    PrivateSessionReducer
});
