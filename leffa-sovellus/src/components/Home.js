// HomePage.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
 // Assuming you have a Header component
import './../styles.css';

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://www.finnkino.fi/xml/News/');
        const xmlData = response.data;
        console.log('XML Data:', xmlData);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

        const newsArray = Array.from(xmlDoc.querySelectorAll('NewsArticle')).map((article) => {
          return {
            Title: article.querySelector('Title')?.textContent || '',
            PublishDate: article.querySelector('PublishDate')?.textContent || '',
            HTMLLead: article.querySelector('HTMLLead')?.textContent || '',
            HTMLContent: article.querySelector('HTMLContent')?.textContent || '',
            ArticleURL: article.querySelector('ArticleURL')?.textContent || '',
            ImageURL: article.querySelector('ImageURL')?.textContent || '',
            ThumbnailURL: article.querySelector('ThumbnailURL')?.textContent || '',
            Categories: Array.from(article.querySelectorAll('NewsArticleCategory')).map((category) => ({
            ID: category.querySelector('ID')?.textContent || '',
            Name: category.querySelector('Name')?.textContent || '',
        })),
       
      };
    });

        setNews(newsArray);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Error fetching news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }
  return (
    <div>
    <h1>Movie News</h1>
    <div className="news-container">
      {news.map((item) => (
        <div key={item.ID} className="news-item">
          <strong>{item.Title}</strong>
          <p>{item.PublishDate}</p>
          {item.HTMLLead && <p>{item.HTMLLead}</p>}
          {item.Synopsis && <p>{item.Synopsis}</p>}
          {item.ImageURL && (
            <img
              src={item.ImageURL}
              alt={`Image for the news article: ${item.Title}`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
  );
        };

export default HomePage;