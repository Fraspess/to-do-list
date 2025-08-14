import {Box,Button} from "@mui/material";
import {Link} from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const Leftbar = () => 
{
    const links = [
        {text:"projects",url:"/projects"},
        {text:"tasks",url:"/tasks"},
        {text:"done", url:"/tasks/done"},
    ]
    const theme = useTheme();
    return(
        <>
        <Box sx={{width:"330px",backgroundColor:theme.palette.primary.main,height:"100vh",display:"flex",gap:1,flexDirection:"column",paddingLeft:1,paddingRight:1}}>
            {links.map((link) => (
                <Link 
                    key={link.url} 
                    to={link.url} 
                    style={{ textDecoration: "none" }}
                >
                    <Button
                        fullWidth
                        sx={{
                            color: theme.palette.text.main,
                            bgcolor: theme.palette.primary.light,
                            padding:"10px",
                            flexGrow: 1,
                            mt:1,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark
                            }
                        }}
                    >
                        {link.text}
                    </Button>
                </Link>
            ))}
        </Box>
        </>
    )
}

export default Leftbar;