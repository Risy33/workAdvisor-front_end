export const selectWorkPlaces = (state) => state.workPlacesReducer.workPlaces;
export const selectLoading = (state) => state.workPlacesReducer.loading;
export const selectFilteredWorkPlaces = (state) =>
  state.workPlacesReducer.filteredWorkPlaces;
