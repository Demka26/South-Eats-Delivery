import { combineReducers } from 'redux';
import authReducer from './authReducer';

let reducers = combineReducers({
    authReducer: authReducer,
})

const rootReducer = (state, action) => {
    return reducers(state, action)
};

export default rootReducer;

