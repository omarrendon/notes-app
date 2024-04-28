import React from "react";
import { Box, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components/index";

const draweWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: "flex" }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <NavBar draweWidth={draweWidth} />
      <SideBar draweWidth={draweWidth} />
      <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
        {/* toolbar */}
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
