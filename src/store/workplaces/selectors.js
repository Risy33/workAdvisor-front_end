export const selectWorkPlaces = (state) => state.workPlacesReducer.workPlaces;
export const selectWorkPlace = (state) => state.workPlacesReducer.workPlace;
export const selectLoading = (state) => state.workPlacesReducer.loading;
export const selectFilteredWorkPlaces = (state) =>
  state.workPlacesReducer.filteredWorkPlaces;
