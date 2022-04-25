import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredWorkPlaces,
  selectWorkPlaces,
  selectLoading,
} from "../../store/workplaces/selectors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header/Header";
import "./WorkPlaces.css";
import { useParams, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function WorkPlaces() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const workPlacesFiltered = useSelector(selectFilteredWorkPlaces);
  const workPlaces = useSelector(selectWorkPlaces);

  console.log("workplaces", workPlaces);

  const { filter } = useParams();

  useEffect(() => {}, [filter]);

  const toMap = !filter ? workPlaces : workPlacesFiltered;

  return (
    <div>
      <Header />
      <div className="work_card">
        {workPlacesFiltered
          ? toMap.map((workPlace) => {
              return (
                <div key={workPlace.id}>
                  <Card
                    sx={{
                      maxWidth: 600,
                      margin: "20px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={workPlace.image}
                      alt={workPlace.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {workPlace.name}
                        <Box
                          sx={{
                            "& > legend": { mt: 2 },
                          }}
                        >
                          <Typography component="legend"></Typography>
                          <Rating
                            name="read-only"
                            value={parseInt(workPlace.rating)}
                            readOnly
                          />
                        </Box>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {workPlace.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {workPlace.address}
                      </Typography>
                    </CardContent>

                    <Button variant="contained">
                      <Link
                        to={`/workplaces/details/${workPlace.id}`}
                        style={{ color: "white" }}
                      >
                        Read stories
                      </Link>
                    </Button>
                  </Card>
                </div>
              );
            })
          : loading}
      </div>
    </div>
  );
}
