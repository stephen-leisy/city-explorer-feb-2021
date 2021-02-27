const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
// const geoData = require('./geojson.js');
// const weatherData = require('./weather.js');
const request = require('superagent');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();
const { myLocationFunction, myWeatherFunction, myReviewsFunction } = require('./mungingfunctions.js');

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with '/api' below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});





app.get('/location', async (req, res) => {
  try {
    const cityThatIsSearched = req.query.search;
    const locationApi = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODING_API_KEY}&q=${cityThatIsSearched}&format=json`);

    const formattedResponse = myLocationFunction(locationApi.body);

    res.json(formattedResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});

app.get('/weather', async (req, res) => {

  try {
    const lat = req.query.latitude;
    const lon = req.query.longitude;
    const weatherApi = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
    const weatherResponse = myWeatherFunction(weatherApi.body);


    res.json(weatherResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }

});


app.get('/reviews', async (req, res) => {
  try {

    const reviewsApi = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}`).set('Authorization', `Bearer ${process.env.YELP_API_KEY}`).set('accept', 'application/json');

    const reviewsResponse = myReviewsFunction(reviewsApi.body);

    res.json(reviewsResponse);
  } catch (e) {

    res.status(500).json({ error: e.message });
  }
});




app.use(require('./middleware/error'));

module.exports = app;
