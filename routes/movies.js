const router = require('express').Router();
const { getMovie } = require('../postgre/movies');

router.get('/:movieId', async (req, res) => {
    const { movieId } = req.params;


    if (!/^\d+$/.test(movieId)) {
        return res.status(400).json({ error: 'Invalid movieId format' });
    }

    try {
        const movieData = await getMovie(movieId);

        if (!movieData || movieData.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json(movieData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
