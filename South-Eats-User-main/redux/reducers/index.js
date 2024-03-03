import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cartReducer from './cartReducer';

let reducers = combineReducers({
    cartReducer: cartReducer,
    authReducer: authReducer,
})

const rootReducer = (state, action) => {
    return reducers(state, action)
};

export default rootReducer;

