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
    case "LOGIN_END":
      return {
        isFetching: false,
        twoFAUser: action.payload,
        error: false,
        user: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default CreateMovieReducer;
