import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.light,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '700px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = () => 
{
  const theme = useTheme();
  const navigate = useNavigate();
    return(
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  sx={{backgroundColor:theme.palette.primary.main}}>
<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Typography
      variant="h4"
      noWrap
      component="div"
      sx={{ 
      display: { xs: 'none', sm: 'block' },
      '&:hover':{
        cursor:"pointer"
      }
    }}
      onClick={() => navigate("/tasks")}
    >
      to-do-list
    </Typography>
  </Box>

  <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  </Box>

  <Box sx={{ width: 48 }}>
        
  </Box>
</Toolbar>
      </AppBar>
    </Box>
    )
}

export default Navbar;