import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/tasksReducer/tasksReducer";
export default configureStore({
    reducer:{
        tasks:taskReducer
    },
})