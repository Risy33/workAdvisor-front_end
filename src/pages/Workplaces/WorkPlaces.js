import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkPlaces } from "../../store/workplaces/actions";
import {
  selectWorkPlaces,
  selectLoading,
} from "../../store/workplaces/selectors";

export default function WorkPlaces() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const workPlaces = useSelector(selectWorkPlaces);

  useEffect(() => {
    dispatch(fetchWorkPlaces);
  }, [dispatch]);

  return (
    <div>
      {workPlaces
        ? workPlaces.map((workPlace) => {
            return (
              <div>
                <h1>{workPlace.name}</h1>
              </div>
            );
          })
        : loading}
    </div>
  );
}
