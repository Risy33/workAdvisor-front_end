import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

export default function ProminentAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <StyledToolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              alignSelf: "flex-end",
              fontSize: 60,
              color: "green",
            }}
          >
            Work Advisor
          </Typography>

          <IconButton
            size="large"
            aria-label="search"
            color="inherit"
          ></IconButton>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="open drawer"
            sx={{ margin: "5px", fontSize: "20px", marginTop: "30px" }}
          >
            <Link style={{ color: "green" }} to="/">
              Home
            </Link>
          </IconButton>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
            sx={{ margin: "5px", fontSize: "20px", marginTop: "30px" }}
          >
            <Link style={{ color: "green" }} to="/login">
              LogIn
            </Link>
          </IconButton>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
            sx={{ margin: "5px", fontSize: "20px", marginTop: "30px" }}
          >
            <Link style={{ color: "green" }} to="/signup">
              SignUp
            </Link>
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
