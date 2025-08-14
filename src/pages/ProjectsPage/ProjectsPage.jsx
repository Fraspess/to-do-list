import {Box} from "@mui/material";
import { useTheme } from "@emotion/react";
const ProjectsPage = () => 
{
    const theme = useTheme();
    return(
        <>
        <Box sx={{alignSelf:"center",height:"100vh",bgcolor:theme.palette.primary.light,width:"100%"}}>
            <Box sx={{display:"flex",flexDirection:"row",flexWrap:"wrap",gap:"20px"}}>
                <Box>
                    
                </Box>
            </Box>
        </Box>
        </>
    );
}

export default ProjectsPage;

