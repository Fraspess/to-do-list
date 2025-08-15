import { Box, Button, Fab, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import CardContent from "@mui/material/CardContent";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoneTask } from "../../store/reducers/tasksReducer/tasksReducer";

const DoneTasksPage = () => {

    const doneTasks = useSelector(state => state.tasks.doneTasks);
    const dispatch = useDispatch();
    
    const handleDelete = (id) => {
        console.log(id);
        console.log(doneTasks)
        const newTasks = doneTasks.filter(task => task.id != id);
        console.log(newTasks);
        dispatch(deleteDoneTask(newTasks));
    }

    const theme = useTheme();
    return (
        <>
            {doneTasks ? (

                <Box sx={{ height: "100%", bgcolor: theme.palette.primary.light, width: "100%" }}>
                    <Typography variant="h2" sx={{textAlign:"center",color:theme.palette.text.main,mt:2}}>Completed Tasks</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "20px", m: 5 }}>
                        {doneTasks.map((task) => (
                            <CardContent sx={{ bgcolor: theme.palette.primary.dark, height: "auto", width: "400px", borderRadius: 3 }}>

                                <Box sx={{ color: theme.palette.text.main }}>
                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: "bold",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            mb: 2,
                                        }}
                                    >
                                        {task.name}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Deadline: {task.deadline}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Priority: {task.priority}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mt: 1,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        {task.description}
                                    </Typography>
                                    <Typography variant="h6" sx={{ mt: 1 }}>
                                        Tags: {task.tags}
                                    </Typography>
                                </Box>

                                <Box sx={{ textAlign: "right", mt: 3 }}>
                                    <Fab size="medium" sx={{ bgcolor: "#800000", color: "#fff" }} onClick={() => handleDelete(task.id)}>
                                        <DeleteIcon sx={{ fontSize: 28 }} />
                                    </Fab>
                                </Box>
                            </CardContent>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Typography>Loading</Typography>
            )}
        </>
    )
}

export default DoneTasksPage;