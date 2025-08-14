import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormHelperText } from "@mui/material"
import { Button } from "@mui/material"
import { addTask } from "../../store/reducers/tasksReducer/tasksReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const AddTaskPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.tasks.tasks);
    const handleSubmit = (values) => {
        const lastId = tasks.at(-1)?.id ?? 1;

        const tagsArray = values.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag)
            .map(tag => `#${tag}`)

        const formattedTags = tagsArray.join(" ");
        const date = new Date(values.deadline);
        const formattedDateTime = date.toLocaleString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit"
        });

        console.log();
        const newTask = {
            id: lastId + 1,
            name: values.name,
            description: values.description,
            priority: values.priority,
            deadline: formattedDateTime,
            tags: formattedTags
        }
        dispatch(addTask(newTask));
        navigate("/tasks");
    }

    const initValues = {
        name: "",
        deadline: new Date().toLocaleDateString(),
        description: "",
        priority: "",
        tags: ""
    }

    const validScheme = Yup.object({
        name: Yup.string()
            .required("Name is a required field").min(3, "Task name must be at least 3 characters"),
        description: Yup.string()
            .required("Task must have a description"),
        deadline: Yup.date()
            .required("Task must have a deadline").min(
                new Date(new Date().setHours(0, 0, 0, 0)),
                "Deadline cannot be in the past"
            ),
        tags: Yup.string()
            .required("Task must have at least 1 tag"),
        priority: Yup.string().required("Task must have a priority")

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

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "90%" }}>

                <Box
                    sx={{
                        height: "100vh",
                        bgcolor: theme.palette.primary.light,
                        width: "700px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "600px",
                            display: "flex",
                            flexDirection: "column",
                            mt: 10,
                            gap: 2
                        }}
                    >
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
                                label="Task description"
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
                                label="Task priority"
                                variant="standard"
                                value={formik.values.priority}
                                error={formik.touched.priority && Boolean(formik.errors.priority)}
                                name="priority"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.touched.priority && formik.errors.priority}
                                InputProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                                InputLabelProps={{
                                    style: { color: theme.palette.text.main }
                                }}
                            />


                            <label style={{ color: theme.palette.text.main }} htmlFor="deadline">Deadline:</label>
                            <input value={formik.values.deadline} onChange={formik.handleChange} onBlur={formik.handleBlur} name="deadline" id="deadline" type="date" style={{ backgroundColor: theme.palette.primary.light, color: theme.palette.text.main }} />
                            {formik.touched.deadline && formik.errors.deadline && (
                                <FormHelperText error style={{ marginLeft: 0, fontSize: "1em" }}>
                                    {formik.errors.deadline}
                                </FormHelperText>
                            )}
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
                                Create task
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AddTaskPage;
