const pgPool = require('./connection');

const sql = {
  INSERT_REVIEW: 'INSERT INTO reviews (account_id, movie_id, review_text, rating) VALUES ($1, $2, $3, $4)',
  SELECT_REVIEW: 'SELECT * FROM reviews WHERE account_id = $1',
  CHECK_REVIEW: 'SELECT * FROM reviews WHERE account_id = $1 AND movie_id = $2',
};

async function fetchAndLogReviews(accountId) {
  const reviews = await getReview(accountId);
  console.log(reviews);
}

fetchAndLogReviews();

async function getReview(account_id) {
  try {
    const result = await pgPool.query('SELECT * FROM reviews WHERE account_id = $1', [account_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error; // Rethrow the error if needed
  }
}

async function addReview(account_id, movie_id, review_text, rating) {
  // Check if the account_id exists in the accounts table
  const accountResult = await pgPool.query('SELECT * FROM account WHERE id = $1', [account_id]);

  if (accountResult.rows.length === 0) {
    // The account_id doesn't exist in the accounts table
    console.error('Error: Account not found');
    return;
  }

  // Insert the review
  await pgPool.query(sql.INSERT_REVIEW, [account_id, movie_id, review_text, rating]);
}

async function checkReview(account_id, movie_id) {
  const result = await pgPool.query(sql.CHECK_REVIEW, [account_id, movie_id]);
  const user = result.rows[0];
  console.log(user);

  return user;
}

module.exports = {
  addReview,
  checkReview,
  getReview,
};

// Example usage
//addReview(11, 123, 'This is a review', 5); // Use the appropriate movie_id
checkReview(11, 123); // Use the appropriate movie_id
