import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExperiences } from "../../store/experiences/actions";
import { selectAllExperiences } from "../../store/experiences/selector";
import "./Experiences.css";
import Header from "../../components/Header/Header";
import { CardHeader, Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "@mui/material/Link";

export default function Experiences() {
  const dispatch = useDispatch();

  const experiences = useSelector(selectAllExperiences);

  useEffect(() => {
    dispatch(fetchAllExperiences);
  }, [dispatch]);

  console.log(experiences);
  return (
    <div>
      <Header />
      <div className="card-container">
        {experiences
          ? experiences.map((e) => {
              return (
                <div key={e.id} className="card">
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: "red[500]" }}
                          aria-label="recipe"
                        ></Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={e.title}
                      subheader={`made the:${e.createdAt}`}
                    />
                    <CardMedia
                      component="img"
                      image={e.image}
                      alt="restaurant pictures"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {e.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">useful:{e.useful}</Button>
                    </CardActions>
                    <Button variant="contained">
                      <Link
                        href={`/workplaces/details/${e.workPlace.id}`}
                        style={{ color: "white" }}
                      >
                        Go to stories
                      </Link>
                    </Button>
                  </Card>
                </div>
              );
            })
          : "loading"}
      </div>
    </div>
  );
}
