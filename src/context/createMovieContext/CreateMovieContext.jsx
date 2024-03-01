import React, { createContext, useEffect, useReducer } from "react";
import CreateMovieReducer from "./CreateMovieReducer";

const INITIAL_STATE = {
  movieData: JSON.parse(localStorage.getItem("movieData")) || null,
  movieStatus: JSON.parse(localStorage.getItem("movieStatus")) || null,
  activeStep: JSON.parse(localStorage.getItem("activeStep")) || 0,
};

export const CreateMovieContext = createContext(INITIAL_STATE);

export const CreateMovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CreateMovieReducer, INITIAL_STATE);
  const step = ["Primary Facts", "Images", "videos"];

  useEffect(() => {
    localStorage.setItem("movieData", JSON.stringify(state.movieData));
    localStorage.setItem("activeStep", JSON.stringify(state.activeStep));
    localStorage.setItem(
      "movieStatus",
      JSON.stringify(state?.movieData?.state_movie)
    );
  }, [state.movieData, state.activeStep, state.movieData?.state_movie]);

  return (
    <CreateMovieContext.Provider
      value={{
        movieData: state.movieData,
        movieStatus: state.movieStatus,
        activeStep: state.activeStep,
        step,
        dispatch,
      }}
    >
      {children}
    </CreateMovieContext.Provider>
  );
};
