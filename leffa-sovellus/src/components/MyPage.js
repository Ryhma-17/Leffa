import React, { useState, useEffect } from 'react';
import MovieList from './Movies'; // Tuodaan MovieList-komponentti
import Modal from 'react-modal';
import './../App.js';


const MyPage = ({ signedIn, setSignedIn }) => {
    const [selectedMovies, setSelectedMovies] = useState([]); // Valitut elokuvat
    const [isMovieSelectorOpen, setMovieSelectorOpen] = useState(false); // Elokuvien valintamoduulin avoimuuden tila
    const [customTitle, setCustomTitle] = useState(''); // Kustomoidun otsikon tila
    const [customBackgroundColor, setCustomBackgroundColor] = useState(''); // Kustomoidun taustavärin tila
    const [hoveredMovieId, setHoveredMovieId] = useState(null); // Hiiren päällä olevan elokuvan id


    const openMovieSelector = () => {
        setMovieSelectorOpen(true);
    };

    const closeMovieSelector = () => {
        setMovieSelectorOpen(false);
    };

    const handleMovieSelect = (movie) => {
        // Tarkistetaan, onko valittu elokuva jo listalla
        const isMovieSelected = selectedMovies.find((selectedMovie) => selectedMovie.id === movie.id);

        // Lisätään elokuva valittujen elokuvien listaan, jos se ei ole vielä siellä ja listassa on tilaa
        if (!isMovieSelected && selectedMovies.length < 5) {
            setSelectedMovies([...selectedMovies, movie]);
        }
    };

    const handleRemoveMovie = (movieId) => {
        // Päivitetään valittujen elokuvien lista poistamalla valittu elokuva
        const updatedMovies = selectedMovies.filter((movie) => movie.id !== movieId);
        setSelectedMovies(updatedMovies);
        setHoveredMovieId(null); // Nollataan hiiren päällä oleva elokuva poiston yhteydessä
    };

    const handleHover = (movieId) => {
        setHoveredMovieId(movieId);
    };

    const handleLeave = () => {
        setHoveredMovieId(null);
    };

    // Vaikutukset, jotka suoritetaan komponentin latautuessa
    useEffect(() => {
        // Haetaan kustomoidut asetukset paikallisesta tallennuksesta

        const storedTitle = localStorage.getItem('customTitle');
        const storedBackgroundColor = localStorage.getItem('customBackgroundColor');
        const storedMovies = localStorage.getItem('selectedMovies');
        

        // Asetetaan kustomoidut asetukset, jos ne ovat olemassa
        if (storedTitle) setCustomTitle(storedTitle);
        if (storedBackgroundColor) setCustomBackgroundColor(storedBackgroundColor);
        if (storedMovies) setSelectedMovies(JSON.parse(storedMovies));
    }, []);

    // Funktiot kustomoidun otsikon ja taustavärin muuttamiseen
    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setCustomTitle(newTitle);
        localStorage.setItem('customTitle', newTitle);
    };

    const handleBackgroundColorChange = (event) => {
        const newBackgroundColor = event.target.value;
        setCustomBackgroundColor(newBackgroundColor);
        localStorage.setItem('customBackgroundColor', newBackgroundColor);
    };

    useEffect(() => {
        // Tallennetaan valitut elokuvat ja kirjautumistila paikalliseen tallennukseen
        localStorage.setItem('selectedMovies', JSON.stringify(selectedMovies));
        localStorage.setItem('signedIn', JSON.stringify(signedIn));
      }, [selectedMovies, signedIn]);
      
  


    // JSX
    return (
        signedIn ? (
          <div style={{ backgroundColor: customBackgroundColor, padding: '20px', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ marginBottom: '20px', color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px', fontFamily: 'Dosis' }}>My Page</h1>
            <input type="color" value={customBackgroundColor} onChange={handleBackgroundColorChange} />
    
            {/* Customizable Content */}
            <h2 style={{ marginTop: '20px', color: '#333', fontFamily: 'Dosis' }}>My Showcase</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
              {selectedMovies.map((movie) => (
                <div
                  key={movie.id}
                  style={{
                    textAlign: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    maxWidth: '200px',
                  }}
                  onMouseEnter={() => handleHover(movie.id)}
                  onMouseLeave={handleLeave}
                >
                  <img
                    src={movie.images.mediumPortrait}
                    alt={`Poster for the movie ${movie.title}`}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease-in-out' }}
                  />
                  <p style={{ marginTop: '10px', fontSize: '16px', color: '#333' }}>{movie.title}</p>
                  {hoveredMovieId === movie.id && (
                    <button
                      style={{
                        backgroundColor: 'red',
                        color: '#fff',
                        padding: '8px 12px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                      onClick={() => handleRemoveMovie(movie.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
            <hr style={{ border: '1px solid #333', margin: '20px 0' }} />
            <button style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }} onClick={openMovieSelector}>Select Movies</button>
            <Modal
              isOpen={isMovieSelectorOpen}
              onRequestClose={closeMovieSelector}
              contentLabel="Movie Selector"
            >
              <MovieList onMovieSelect={handleMovieSelect} />
              <button style={{ backgroundColor: '#333', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }} onClick={closeMovieSelector}>Close</button>
            </Modal>
          </div>
        ) : (
          <div className="login-container" style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#333', marginBottom: '20px', fontFamily: 'Dosis' }}>Sign in to customize MyPage</h1>
            {/* Add your login form or any other content here */}
          </div>
        )
      );
    };

export default MyPage;
