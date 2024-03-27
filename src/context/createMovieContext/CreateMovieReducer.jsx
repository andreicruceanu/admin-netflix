const CreateMovieReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_MOVIE_PRIMARY_FACTS_SUCCESS":
      return {
        movieData: action.payload,
        movieStatus: action.payload.state_movie,
        activeStep: state.activeStep + 1,
      };
    case "DELETE_MOVIE_SUCCESS":
      return {
        movieData: null,
        movieStatus: null,
        activeStep: 0,
      };
    case "SAVE_IMAGES_SUCCESS":
      return {
        movieData: action.payload,
        movieStatus: action.payload.state_movie,
        activeStep: state.activeStep + 1,
      };
    case "SAVE_VIDEO_SUCCESS":
      return {
        movieData: action.payload,
        movieStatus: action.payload.state_movie,
        activeStep: state.activeStep + 1,
      };
    case "CREATE_ANOTHER_MOVIE":
      return {
        movieData: null,
        movieStatus: null,
        activeStep: 0,
      };
    case "LOGOUTFORMOVIE":
      return {
        movieData: null,
        movieStatus: null,
        activeStep: 0,
      };
    default:
      return {
        ...state,
      };
  }
};
export default CreateMovieReducer;
