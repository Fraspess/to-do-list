import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: JSON.parse(localStorage.getItem("projects")) || [],
}

const projectSlice = createSlice({
    name:"projects",
    initialState,
    reducers:{
        addProject: (state,action) => {
            state.projects.push(action.payload);
            localStorage.setItem("projects",JSON.stringify(state.projects));
        },
    }

})
export const {addProject} = projectSlice.actions;
export default projectSlice.reducer;