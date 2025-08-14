import Navbar from "../Navbar/Navbar";
import {Box} from "@mui/material";
import { Outlet } from "react-router-dom";
import Leftbar from "../Leftbar/Leftbar";

const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Leftbar />
        <Box sx={{ flexGrow: 1, display: "flex",p:2 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DefaultLayout;
