export const selectAllExperiences = (state) =>
  state.experiencesReducer.allExperiences;

export const selectLoading = (state) => state.experiencesReducer.loading;

export const selectExperience = (state) => state.experiencesReducer.experience;
