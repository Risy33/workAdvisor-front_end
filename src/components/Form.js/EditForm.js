import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMyExperience } from "../../store/experiences/actions";
import { selectExperience } from "../../store/experiences/selector";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Form.css";

export default function EditForm(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [image, setImage] = useState(props.image);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  ;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editMyExperience(props.id, title, description, image));
    handleClose();
    setImage("");
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

  
  return (
    <div>
      <Button onClick={handleOpen}>Edit experience</Button>

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
                placeholder={title}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />

              <label>Description</label>
              <textarea
                type="text"
                placeholder={description}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />

              <label>Image</label>
              <input
                type="text"
                placeholder={image}
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />

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
