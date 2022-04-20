import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterExperiences } from "../../store/experiences/actions";

export default function Header() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  console.log("title", title);
  const submit = (e) => {
    e.preventDefault();
    dispatch(filterExperiences(title));
  
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
          placeholder="Search Experience"
          inputProps={{ "aria-label": "search google maps" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
