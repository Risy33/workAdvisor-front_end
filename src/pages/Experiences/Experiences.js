import React, { useEffect } from "react";
import Card from "@mui/material/Card";
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
import { updateUseful } from "../../store/experiences/actions";
import { selectToken, selectUser } from "../../store/user/selector";
import moment from "moment";

export default function Experiences() {
  const dispatch = useDispatch();

  const experiences = useSelector(selectAllExperiences);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  console.log("user", user);

  useEffect(() => {
    dispatch(fetchAllExperiences);
  }, [dispatch]);

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
                        >
                          {user.name}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={e.title}
                      subheader={moment(e.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
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

                    <Button variant="contained">
                      <Link
                        href={`/workplaces/details/${e.workPlace.id}`}
                        style={{ color: "white" }}
                      >
                        Go to stories
                      </Link>
                    </Button>
                    <Button
                      onClick={() => dispatch(updateUseful(e.id, e.useful))}
                      size="small"
                    >
                      Was it useful? {e.useful} 👍
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
