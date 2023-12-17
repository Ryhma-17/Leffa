import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Stars from './reviews';
import './../styles.css';
require('dotenv').config();

const MovieList = ({ onMovieSelect }) => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMovies = useCallback(async () => {
    try {
      const apiKey = process.env.APIKEY;
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          api_key: apiKey,
          sort_by: 'popularity.desc',
          query: searchQuery,
          page: currentPage,
        },
      });

      const moviesArray = response.data.results.map((movie) => ({
        id: movie.id.toString(),
        title: movie.title,
        images: {
          smallPortrait: `https://image.tmdb.org/t/p/w185${movie.poster_path}`,
          mediumPortrait: `https://image.tmdb.org/t/p/w300${movie.poster_path}`,
          largePortrait: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      }));

      // Filter out duplicates based on movie ID
      setMovies((prevMovies) => {
        const uniqueMovies = [...new Map([...prevMovies, ...moviesArray].map(movie => [movie.id, movie])).values()];
        return uniqueMovies;
      });

      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching data from TMDb:', error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Reset current page when the search query changes
    setCurrentPage(1);
  };

  const handleMovieClick = (movie) => {
    if (onMovieSelect) {
      onMovieSelect(movie);
    }
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const filteredMovies = movies
    .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="movie-list">
      <h1 className="header">Movies</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="movie-cards">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie)}>
            <img
              src={movie.images.mediumPortrait}
              alt={`Poster for the movie ${movie.title}`}
              className="movie-image"
            />
            <div className="movie-details">
              <strong>{movie.title}</strong>
              <Stars iconCount={5} />
            </div>
          </div>
        ))}
      </div>
      {currentPage < totalPages && (
        <button onClick={loadMore} disabled={currentPage >= totalPages}>
          Load More
        </button>
      )}
    </div>
  );
};

export default MovieList;