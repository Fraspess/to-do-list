import { Box, TextField,Typography,MenuItem} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material"
import { Button } from "@mui/material"
import { addTask } from "../../store/reducers/tasksReducer/tasksReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../store/reducers/projectsReducer/projectsReducer";


const AddProjectPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const projects = useSelector(state => state.projects.projects);
    const handleSubmit = (values) => {
        const lastId = projects.at(-1)?.id ?? 1;

        const tagsArray = values.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag)
            .map(tag => `#${tag}`)

        const formattedTags = tagsArray.join(" ");

        console.log();
        const newProject = {
            id: lastId + 1,
            name: values.name,
            description: values.description,
            priority: values.priority,
            tags: formattedTags
        }
        dispatch(addProject(newProject));
        navigate("/projects");
    }

    const initValues = {
        name: "",
        description: "",
        priority: "",
        tags: ""
    }

    const validScheme = Yup.object({
        name: Yup.string()
            .required("Name is a required field").min(3, "Project name must be at least 3 characters"),
        description: Yup.string()
            .required("Project must have a description"),
        tags: Yup.string()
            .required("Project must have at least 1 tag"),
        priority: Yup.string().required("Project must have a priority")

    });

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleSubmit,
        validationSchema: validScheme,
        validateOnChange: true,
        validateOnBlur: true,
    });
    return (
        <>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "top", height: "100vh", width: "88.3%",borderRadius:3 }}>

                <Box
                    sx={{
                        height: "600px",
                        bgcolor: theme.palette.primary.light,
                        width: "700px",
                        display: "flex",
                        justifyContent:"center",
                        borderRadius:3
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "600px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mt:7,
                        }}
                    >
                        <Typography variant="h2" sx={{textAlign:"center",color:theme.palette.text.main}}>Add New Project</Typography>
                        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <TextField
                                label="Task name"
                                variant="standard"
                                value={formik.values.name}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.touched.name && formik.errors.name}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                            />



                            <TextField
                                label="Project description"
                                variant="standard"
                                value={formik.values.description}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.touched.description && formik.errors.description}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
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
                                label="Task tags (seperate words with comma)"
                                variant="standard"
                                value={formik.values.tags}
                                error={formik.touched.tags && Boolean(formik.errors.tags)}
                                name="tags"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.touched.tags && formik.errors.tags}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                            />


                            <Button variant="contained" type="submit" disabled={!formik.isValid}>
                                Create Project
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AddProjectPage;
