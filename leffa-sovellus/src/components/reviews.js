import React, { useState } from 'react';

const Stars = ({ iconCount }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

 /* async function saveReview() {
    console.log('Saving review with account_id:', account_id, 'and movie_id:', movie_id);

    const response = await fetch('http://localhost:3001/reviews/', {
        method: 'POST',
        body: JSON.stringify({ rating: rating, comment: comment, movie_id: 1, user_id: localStorage.getItem('username') }),
    });

    if (response.ok) {
      // Arvostelun luonti onnistui
      const data = await response.json();
      console.log('New review created:', data);
      
    } else {
      // epäonnistui
      const errorData = await response.json();
      console.error('Failed to create new review:', errorData.error);
    }
  } */

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= iconCount; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleStarClick(i)}
          style={{
            color: i <= rating ? '#E9C46A' : 'transparent',
            textShadow: '0 0 5px #E9C46A', // Outline effect
            cursor: 'pointer',
            fontSize: '24px',
            marginRight: '5px',
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <div className='header'>Your ratings</div>
      <div style={{ marginTop: '7px' }}>{renderStars()}</div>
      <label htmlFor="comment">Comment:</label>
      <textarea
        style={{ display: 'block', marginTop: '5px' }}
        id="comment"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Leave a comment..."
        rows="4"
        cols="50"
      />
    <button type="submit" /*onClick={() => saveReview()}*/>Submit</button>
    </div>
  );
};

export default Stars;
