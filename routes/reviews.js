const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const { addReview, checkReview, getReview } = require('../postgre/reviews');
const { getMovie } = require('../postgre/movies');

router.get('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;

    try {
        const reviewData = await getReview(reviewId);

        if (!reviewData || reviewData.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json(reviewData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', upload.none(), async (req, res) => {
    const { account_id, movie_id, review_text, rating } = req.body;

    if (!/^\d+$/.test(account_id) || !/^\d+$/.test(movie_id)) {
        return res.status(400).json({ error: 'Invalid account_id or movie_id format' });
    }


    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({ error: 'Invalid rating format' });
    }

    try {
        await addReview(account_id, movie_id, review_text, rating);
        res.status(201).json({ message: 'Review created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
