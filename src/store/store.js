import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/tasksReducer/tasksReducer";
import projectReducer from "./reducers/projectsReducer/projectsReducer";
export default configureStore({
    reducer:{
        tasks:taskReducer,
        projects:projectReducer,
    },
})