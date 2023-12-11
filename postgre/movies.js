const axios = require('axios');
const pgPool = require('./connection');

const tmdbApiKey = '2fec1e16d4aa6b56f3458f21d6bb19d1';
const tmdbEndpoint = 'https://api.themoviedb.org/3/discover/movie';

const sql = {
    INSERT_MOVIE: 'INSERT INTO movies (title) VALUES ($1)',
    SELECT_MOVIE: 'SELECT * FROM movies WHERE movie_id = $1',
    CHECK_MOVIE: 'SELECT * FROM movies WHERE title = $1',
  };

  const fetchMoviesFromTMDB = async () => {
    const apiKey = tmdbApiKey // Replace with your actual API key
    const totalPages = 50; // Set the number of pages you want to fetch
  
    let movies = [];
  
    for (let page = 1; page <= totalPages; page++) {
      try {
        const response = await axios.get(tmdbEndpoint, {
          params: {
            api_key: apiKey,
            sort_by: 'popularity.desc',
            page: page,
          },
        });
  
        const moviesArray = response.data.results.map((movie) => {
          return {
            movie_id: movie.id,
            title: movie.title,
          };
        });
  
        movies = [...movies, ...moviesArray];
      } catch (error) {
        console.error('Error fetching data from TMDB:', error);
      }
    }
  
    return movies;
  };

  async function insertMovies() {
    try {
      const tmdbMovies = await fetchMoviesFromTMDB();
  
      for (const movie of tmdbMovies) {
        try {
          const { title } = movie;
  
          // Check if the title is not empty or null before inserting
          if (title && typeof title === 'string') {
            // Check if the movie title already exists in the database
            const existingMovie = await pgPool.query(sql.CHECK_MOVIE, [title]);
            if (existingMovie.rows.length === 0) {
              // If the movie title doesn't exist, insert it (ignoring movie_id)
              await pgPool.query(sql.INSERT_MOVIE, [title]);
              console.log(`Inserted movie title: ${title}`);
            } else {
              console.log(`Movie title already exists: ${title}`);
            }
          } else {
            console.error(`Invalid title for movie:`, movie);
          }
        } catch (error) {
          console.error(`Error inserting movie title:`, movie);
          console.error(`Error details:`, error);
        }
      }
  
      console.log('Movie titles insertion process completed.');
    } catch (error) {
      console.error('Error fetching movies from TMDB:', error);
    } finally {
      // Close the database connection
      await pgPool.end();
    }
  }
  
  
  
  
  

insertMovies();
