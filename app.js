require('dotenv').config();
const express = require('express');
const userRoute = require('./routes/user');
//const movieRoute = require('./routes/movie');
const cors = require('cors');

const app = express();

//Setting middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//Setting routes
app.use('/user', userRoute );
//app.use('/movies', movieRoute);

//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log('Server running on port ' + PORT);
} );

/**
 * Root mapping.
 */
app.get('/', (req, res) => {

   
    
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