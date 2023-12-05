import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../styles.css';

const MovieList = () => {
  // hookit elokuvien ja hakusanatulosten tilan hallintaan
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // haetaan elokuvat Finnkinon API:sta komponentin latautuessa
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.finnkino.fi/xml/Events/', {
          params: {
            includePictures: true,
            includeGallery: true,
          },
        });

        // Parsitaan XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');

        // Tapahtumien lista
        const eventsArray = Array.from(xmlDoc.querySelectorAll('Event')).map((event) => {
          return {
            id: event.querySelector('ID')?.textContent || '',
            title: event.querySelector('Title')?.textContent || '',
            images: {
              smallPortrait: event.querySelector('EventSmallImagePortrait')?.textContent || '',
              mediumPortrait: event.querySelector('EventMediumImagePortrait')?.textContent || '',
              largePortrait: event.querySelector('EventLargeImagePortrait')?.textContent || '',
              smallLandscape: event.querySelector('EventSmallImageLandscape')?.textContent || '',
            },
          };
        });


        setEvents(eventsArray);
      } catch (error) {
        console.error('Virhe datan hakemisessa:', error);
      }
    };

    fetchData();
  }, []);


  const handleSearch = (e) => {       // funktio hakukentän tekstin muutoksille
    setSearchQuery(e.target.value);
  };


  const filteredEvents = events.filter((event) =>                   // Tapahtumien suodatus haun perusteella
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="movie-list">
      <h1 className="header"> Movies</h1>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="movie-cards">
        {filteredEvents.map((event) => (
          <div key={event.id} className="movie-card">
            <img
              src={event.images.mediumPortrait}
              alt={`Juliste elokuvalle ${event.title}`}
              className="movie-image"
            />
            <div className="movie-details">
              <strong>{event.title}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
