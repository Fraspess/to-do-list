import { Box, Button, Typography, CardContent, Fab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ProjectsPage = () => {
    const theme = useTheme();
    const projects = useSelector(state => state.projects.projects);
    const tasks = useSelector(state => state.tasks.tasks);
    return (
        <>
            {projects ? (

                <Box sx={{ height: "100%", bgcolor: theme.palette.primary.light, width: "100%" }}>
                    <Box sx={{ m: 4, display: "flex" }}>
                        <Link to={"/projects/add"} style={{ width: "100%", textAlign: "center" }}>
                            <Button variant="contained"
                                sx={{
                                    bgcolor: theme.palette.primary.dark,
                                    width: "100%"
                                }}>
                                <Typography variant="h5">Add new project</Typography>
                            </Button>
                        </Link>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "20px", m: 4 }}>
                        {projects.map(project => (
                            <CardContent key={project.id} sx={{ bgcolor: theme.palette.primary.dark, borderRadius: 3,color:theme.palette.text.main,width:"400px"}}>
                                <Typography variant="h4">{project.name}</Typography>
                                <Typography variant="h6">Tasks:</Typography>
                                {tasks.filter(t => t.projectId === project.id).length > 0 ? (
                                    tasks.filter(t => t.projectId === project.id).map(t => (
                                        <Typography variant="h5" key={t.id}>- {t.name} ({t.priority})</Typography>
                                    ))
                                ) : (
                                    <Typography>No tasks</Typography>
                                )}

                                <Link to={`/projects/${project.id}/addTask`}>
                                    <Button variant="contained" sx={{ mt: 2 }}>Add Task to Project</Button>
                                </Link>
                            </CardContent>
                        ))}

                    </Box>
                </Box>
            ) : (
                <Typography>Loading</Typography>
            )}
        </>
    );
}

export default ProjectsPage;

