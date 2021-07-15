import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';

const UpcomingMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);
  const playlist = movies.filter(m => m.playlist)
  localStorage.setItem('playlist', JSON.stringify(playlist))

  const addToPlaylist = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, playlist: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
      />
  );
};
export default UpcomingMoviesPage;