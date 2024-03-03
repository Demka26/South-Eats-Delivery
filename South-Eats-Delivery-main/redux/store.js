import { createStore } from "redux";
//import {configureStore} from '@reduxjs/toolkit'

import reducer from "./reducers/index";


// export const store= configureStore(initialState);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState);
    return store;
}