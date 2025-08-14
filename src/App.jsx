import './App.css';
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { ThemeProvider } from '@emotion/react';
import mainTheme from "./components/themes/mainTheme"
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import { Navigate } from 'react-router-dom';
import AddTaskPage from './pages/TasksPage/AddTaskPage';
import EditTaskPage from "./pages/TasksPage/EditTaskPage";

function App() {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Navigate to="/tasks" replace />} />
            <Route path='/tasks' element={<TasksPage />} />
            <Route path="/tasks/add" element={<AddTaskPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="/tasks/edit/:id"  element={<EditTaskPage />}/>
          </Route>
        </Routes>
      </ThemeProvider>
    </>

  )
}

export default App
