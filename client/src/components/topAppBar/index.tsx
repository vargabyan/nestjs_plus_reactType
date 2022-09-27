import React from "react";
import {
  AppBar,
  createTheme,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { TopAppBarStyle } from "./TopAppBarStyle";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2cf",
    },
  },
});

const TopAppBar: React.FC = () => {
  return (
    <TopAppBarStyle>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              className="TopAppBarTypography"
              variant="h5"
              align="center"
            >
              Nest JS and React JS
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </TopAppBarStyle>
  );
};

export default TopAppBar;
