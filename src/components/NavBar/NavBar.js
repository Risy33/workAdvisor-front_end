import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "../../store/user/selector";
import { logOut } from "../../store/user/actions";

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
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutBotton = () => {
    navigate("/");
    dispatch(logOut());
  };

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
            <Link style={{ color: "green" }} to="/">
              Work Advisor
            </Link>
          </Typography>

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
            <Link style={{ color: "green" }} to="/workPlaces">
              Work Places
            </Link>
          </IconButton>
          {!token ? (
            <div>
              {" "}
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
            </div>
          ) : (
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              onClick={logOutBotton}
              sx={{
                margin: "5px",
                fontSize: "20px",
                marginTop: "30px",
                color: "green",
              }}
            >
              LogOut
            </IconButton>
          )}
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
