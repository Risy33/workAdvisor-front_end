import React, { useState } from "react";
import { selectWorkPlace } from "../../store/workplaces/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkPlaceId } from "../../store/workplaces/actions";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { updateUseful } from "../../store/experiences/actions";

import { filterExperiencesByRate } from "../../store/experiences/actions";
import "./Details.css";
import { selectExperience } from "../../store/experiences/selector";

export default function Details() {
  const dispatch = useDispatch();
  const params = useParams();

  const workPlace = useSelector(selectWorkPlace);
  const experience = useSelector(selectExperience);
  const { id } = params;
  const [sorted, setSorted] = useState([]);
  console.log("sorted", sorted);

  useEffect(() => {
    if (workPlace) setSorted([...workPlace.experiences]);
  }, [workPlace]);

  useEffect(() => {
    dispatch(fetchWorkPlaceId(id));
    dispatch(filterExperiencesByRate());
  }, [dispatch, id]);

  const sort = (sortBy) => {
    switch (sortBy) {
      case "date":
        setSorted(
          [...workPlace.experiences].sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          )
        );

        break;
      case "rating":
        setSorted(
          [...workPlace.experiences].sort((a, b) => b.rating - a.rating)
        );
        break;
      default:
        setSorted([...workPlace.experiences]);
    }
  };

  return (
    <div>
      <div>
        Sort by:
        <select onChange={(e) => sort(e.target.value)}>
          <option value="">Select...</option>
          <option value="rating">Rating</option>
          <option value="date">Date</option>
        </select>
      </div>
      {!workPlace ? (
        "loading"
      ) : (
        <div className="details_workPlaces">
          <Card sx={{ width: "60rem" }}>
            <CardMedia
              component="img"
              height="300px"
              image={workPlace.image}
              alt={workPlace.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {workPlace.name}

                <Button size="small">rating: {workPlace.rating}</Button>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {workPlace.address}
              </Typography>
            </CardContent>

            <div>
              {!sorted
                ? "loading"
                : sorted.map((e) => {
                    return (
                      <div key={e.id}>
                        <Card sx={{ maxWidth: "600px", margin: 5 }}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            color="text.secondary"
                          >
                            {e.title}
                          </Typography>
                          <Typography variant="body3" color="text.secondary">
                            {e.description}
                          </Typography>
                          <Typography>{e.createdAt}</Typography>
                          <CardActions>
                            <Button size="small">
                              Was it useful? {e.useful}
                            </Button>
                            <button
                              onClick={() =>
                                dispatch(updateUseful(e.id, e.useful))
                              }
                            >
                              Thumb up
                            </button>
                          </CardActions>
                        </Card>
                      </div>
                    );
                  })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
