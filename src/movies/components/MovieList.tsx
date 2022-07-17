import React, { useState, useEffect } from 'react';

import { MovieCard } from './MovieCard';
import { AddMovieButton } from './AddMovieButton';
import { AddMovieForm } from './AddMovieForm';
import { Card } from 'shared/components';

import { useMovies } from './MovieProvider';
import { getMovies } from '../../api/movies';

type NewMovieMode = "BUTTON" | "FORM"

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState('button');

  const showForm = () => {
    setDisplayOptionType('form');
  };

  const closeForm = () => {
    setDisplayOptionType('button');
  };

  const addMovie = (movie: Record< "imageUrl" | "title" | "subtitle" | "description", string>) => {
    moviesDispatch({
      type: 'add',
      payload: {
        movie,
      }
    });
    closeForm();
  };

  // TODO: Display list of movies
  
  return (
    <div className="card-deck">
      {movies.map(movie => (
        <Card key={'movie-item-' + movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>      
      ))}
      <Card>
        {/* TODO: Implement displaying appropriate card for add movie - button or form */}
        {/* TODO: use AddMovieButton and AddMovieForm */}
        {
          displayOptionType === 'button' ? <AddMovieButton onClick={showForm} /> : <AddMovieForm onCancel={closeForm} onSubmit={addMovie} />
        }
      </Card>
    </div>
  );
}
