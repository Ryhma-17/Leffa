require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pgPool = require('./postgre/connection');


const accountRoute = require('./routes/account');
const groupsRoute = require('./routes/groups');
const reviewsRoute = require('./routes/reviews');
//const movieRoute = require('./routes/movie');

const app = express();

//Setting middleware
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


//Setting routes
app.use('/account', accountRoute );
app.use('/groups', groupsRoute);
app.use('/reviews', reviewsRoute);
//app.use('/movies', movieRoute);

//Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log('Server running on port ' + PORT);
} );

/**
 * Root mapping.
 */
app.get('/', (req, res) => {

res.send('Hello World!');   
    
});

/**
 * Post mapping test.
 */
app.post('/info' ,(req,res) => {

    req.body.forEach(element => {
        console.log(element);
        console.log('-----');
    });
     console.log(req.body.username);
     console.log(req.body.pw);

    res.send('Post working');
});

app.post('/user', (req,res) => {
    console.log(req.body);
    res.send('Post working');
});

module.exports = app;