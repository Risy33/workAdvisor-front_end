import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterWorkplaces } from "../../store/workplaces/actions";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("name", name);
  const submit = (e) => {
    e.preventDefault();
    dispatch(filterWorkplaces(name));
    navigate(`/workPlaces/${name}`);
  };

  return (
    <div className="header">
      <Paper
        component="form"
        onSubmit={submit}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 800,
          height: 50,
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Work PLace"
          inputProps={{ "aria-label": "search google maps" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
