import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/commentSlice";
import data from "../data.json";

const initialState = {
    currentUser: data.currentUser,
    comments: data.comments,
};


const store = configureStore({
    reducer:{
        comments: commentReducer,
    },
    //here we already have data 
    preloadedState: initialState,
});

export default store;