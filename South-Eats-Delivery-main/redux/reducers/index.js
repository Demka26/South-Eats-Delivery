import { combineReducers } from 'redux';
import userReducer from './authReducer';

let reducers = combineReducers({
    userReducer: userReducer,
})

const rootReducer = (state, action) => {
    return reducers(state, action)
};

export default rootReducer;

