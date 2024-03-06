export const createMoviePrimaryFacts = (dataMovie) => ({
  type: "CREATE_MOVIE_PRIMARY_FACTS_SUCCESS",
  payload: dataMovie,
});

export const deleteMovie = () => ({
  type: "DELETE_MOVIE_SUCCESS",
});

export const saveImagesMovie = (dataMovie) => ({
  type: "SAVE_IMAGES_SUCCESS",
  payload: dataMovie,
});
