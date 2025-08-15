import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    doneTasks: JSON.parse(localStorage.getItem("doneTasks")) || [],
    searchQuery:"",
}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        deleteTask: (state, action) => {
            console.log(action);
            console.log(state);
            state.tasks = action.payload;
            if (state.tasks) {
                localStorage.setItem("tasks", JSON.stringify(state.tasks));
            }
            localStorage.removeItem("tasks");
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                localStorage.setItem("tasks", JSON.stringify(state.tasks));
            }
        },
        doneTask: (state, action ) => {
            const task = state.tasks.find((t) => t.id == action.payload);
            if(task)
            {
                state.tasks = state.tasks.filter((t) => t.id != action.payload);
                localStorage.setItem("tasks",JSON.stringify(state.tasks));
                state.doneTasks.push(task);
                localStorage.setItem("doneTasks",JSON.stringify(state.doneTasks));
            }
        },
        deleteDoneTask: (state, action) => {
            console.log(state, action);
            state.doneTasks = action.payload;
            if(state.doneTasks)
            {
                localStorage.setItem("doneTasks",JSON.stringify(state.doneTasks));
            }
            localStorage.removeItem("doneTasks");
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
})

export const { addTask } = taskSlice.actions
export const { deleteTask } = taskSlice.actions
export const {editTask} = taskSlice.actions
export const {doneTask} = taskSlice.actions
export const {deleteDoneTask} = taskSlice.actions
export const {setSearchQuery} = taskSlice.actions
export default taskSlice.reducer
