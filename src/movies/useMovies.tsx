import React, { useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { Movie, MoviesAction } from 'types';
import { getMovies } from 'api/movies';
import { getAvgRating } from './ratings';

interface MoviesState {
  movies: Movie[]
  initialized: boolean
}

export function useMoviesCollection(): [MoviesState, React.Dispatch<MoviesAction>] {
  // TODO: Implement all action processing

  const movieReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
    switch (action.type) {
      case 'fetch':
        return { ...state, movies: action.payload.data, initialized: true };

      case 'add':
        const { imageUrl, title, subtitle, description } = action.payload.movie;
        const newId = uuid();
        const newMovie: Movie = { id: newId, imageUrl, title, subtitle, description, ratings: [0]}
        return { ...state, movies: [...state.movies, newMovie] };

      case 'delete':
        const movieId = action.payload.movieId;
        state.movies.some((e, index) => {
          if (e.id === movieId) {
            state.movies.splice(index, 1);
            return true;
          }
          return false;
        })
        return { ...state, movies: [...state.movies] };

      case 'rate':
        const id = action.payload.movieId;
        const rating = action.payload.rating;
        state.movies.some((e) => {
          if (e.id === id) {
            e.ratings.push(rating);
            return true;
          }
          return false;
        })
        return { ...state, movies: [...state.movies] };

      default:
        return state
    }
  };

  const [state, dispatch] = useReducer(movieReducer, {
    movies: [],
    initialized: false,
  });

  useEffect(() => {
    // TODO: Call fetch action
    getMovies()
      .then((list) => {
         dispatch({
              type: 'fetch',
              payload: {
                  data: list
              }
          });
      })
  }, []);

  return [state, dispatch];
}
