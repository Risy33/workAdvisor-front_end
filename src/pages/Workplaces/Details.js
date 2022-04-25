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
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { updateUseful } from "../../store/experiences/actions";
import "./Details.css";
import { selectToken } from "../../store/user/selector";
import Form from "../../components/Form.js/Form";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Header from "../../components/Header/Header";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

export default function Details() {
  const dispatch = useDispatch();
  const params = useParams();

  const workPlace = useSelector(selectWorkPlace);
  const token = useSelector(selectToken);

  const { id } = params;
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    if (workPlace) setSorted([...workPlace.experiences]);
  }, [workPlace]);

  useEffect(() => {
    dispatch(fetchWorkPlaceId(id));
  }, [dispatch, id]);

  const sort = (sortBy) => {
    console.log("sort by", sortBy);
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
          [...workPlace.experiences].sort((a, b) => b.useful - a.useful)
        );
        break;
      default:
        setSorted([...workPlace.experiences]);
    }
  };
  const position = [52.37306882922609, 4.892661365801631];

  return (
    <div>
      <Header />
      <div>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Filter
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={(e) => sort(e.target.value)}
            autoWidth
            value={""}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"date"}>Date</MenuItem>
            <MenuItem value={"rating"}>Rating</MenuItem>
          </Select>
        </FormControl>
      </div>
      {token ? <Form /> : null}
      {!workPlace ? (
        "loading"
      ) : (
        <div className="details_workPlaces">
          
          <Card sx={{ width: "60rem" }}>
            <CardMedia
              component="img"
              sx={{ width: "30rem", height: "20rem" }}
              image={workPlace.image}
              alt={workPlace.name}
            />
            
            <div className="right-side">
              <CardContent>
                <div className="name">
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
                </div>
                <div className="address">
                  <Typography variant="body2" color="text.secondary">
                    {workPlace.address}
                  </Typography>
                </div>
                <div className="map">
                  <MapContainer
                    center={[workPlace.latitude, workPlace.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenSrreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={[workPlace.latitude, workPlace.longitude]}
                    >
                      <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </CardContent>
            </div>
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
                          <CardMedia
                            component="img"
                            image={e.image}
                            alt="restaurant pictures"
                          />
                          <Typography variant="body3" color="text.secondary">
                            {e.description}
                          </Typography>
                          <Typography>
                            {moment(e.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </Typography>
                          <CardActions>
                            <Button size="small">
                              Was it useful? {e.useful}
                            </Button>
                            <button
                              onClick={() => {
                                dispatch(updateUseful(e.id, e.useful));
                              }}
                            >
                              👍
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
//  <div>
//    Sort by:
//    <select onChange={(e) => sort(e.target.value)}>
//      <option value="">Select...</option>
//      <option value="rating">Rating</option>
//      <option value="date">Date</option>
//    </select>
//  </div>;
