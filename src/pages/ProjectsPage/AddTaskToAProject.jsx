import { Box, TextField, Typography, Button, FormHelperText, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask } from "../../store/reducers/tasksReducer/tasksReducer";

const AddTaskPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const projects = useSelector(state => state.projects.projects);

    const handleSubmit = (values) => {
        const tagsArray = values.tags
        .split(",")
        .map(tag => tag.trim())
        .map(tag => tag.startsWith("#") ? tag : `#${tag}`);

        const formattedTags = tagsArray.join(" ");
        const newTask = {
            id: Date.now(),
            name: values.name,
            description: values.description,
            priority: values.priority,
            deadline: values.deadline,
            tags: formattedTags,
            projectId: values.projectId || null
        };

        dispatch(addTask(newTask));
        navigate("/tasks");
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            priority: "",
            deadline: "",
            tags: "",
            projectId: id || ""
        },
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            priority: Yup.string().required("Required"),
            deadline: Yup.date().required("Required"),
            tags: Yup.string().required("Required"),
            projectId: Yup.string().nullable()
        })
    });

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "top", height: "100vh", width: "88.3%", borderRadius: 3 }}>

                <Box
                    sx={{
                        height: "750px",
                        bgcolor: theme.palette.primary.light,
                        width: "700px",
                        display: "flex",
                        justifyContent: "center",
                        borderRadius: 3
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "600px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt: 7,
                            color: theme.palette.text.main
                        }}>

                        <Typography variant="h4" sx={{ mb: 2 }}>Add Task</Typography>
                        <form onSubmit={formik.handleSubmit} style={{ color: theme.palette.text.main }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                            />
                            <TextField
                                select
                                fullWidth
                                margin="normal"
                                label="Priority"
                                name="priority"
                                value={formik.values.priority}
                                onChange={formik.handleChange}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </TextField>
                            <TextField
                                fullWidth
                                margin="normal"
                                type="date"
                                name="deadline"
                                value={formik.values.deadline}
                                onChange={formik.handleChange}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                error={formik.touched.deadline && Boolean(formik.errors.deadline)}
                                helperText={formik.touched.deadline && formik.errors.deadline}
                            />
                            <TextField
                                fullWidth
                                margin="normal
                      " label="Tags"
                                name="tags"
                                value={formik.values.tags}
                                onChange={formik.handleChange}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                error={formik.touched.tags && Boolean(formik.errors.tags)}
                                helperText={formik.touched.tags && formik.errors.tags}
                            />

                            <TextField
                                select
                                fullWidth
                                margin="normal"
                                label="Project (optional)"
                                name="projectId"
                                value={formik.values.projectId}
                                onChange={formik.handleChange}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                            >
                                <MenuItem value="">No Proejct</MenuItem>
                                {projects.map(p => (
                                    <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                                ))}
                            </TextField>

                            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Create Task</Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AddTaskPage;
