import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createExperience } from "../../store/experiences/actions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Form.css";

export default function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createExperience(title, description, imageSelected));
    handleClose();
    setImageSelected("");
    setDescription("");
    setTitle("");
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    height: "550px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ibokrp5h");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/duoj5escy/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log("file", file);
    setImageSelected(file.url);
  };

  return (
    <div>
      <div className="add-experience">
        <Button
          className="add-experience-button"
          variant="contained"
          color="success"
          onClick={handleOpen}
        >
          Add your Experience
        </Button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Your Story
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
            <form className="submission-form" onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <label>Description</label>
              <textarea
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <label>Image</label>
              <input type="file" placeholder="url" onChange={uploadImage} />

              <button className="submit-button" type="submit">
                Submit
              </button>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
