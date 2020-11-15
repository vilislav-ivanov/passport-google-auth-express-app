const express = require('express');
const mongoose = require('mongoose');

const { port, mongoURI } = require('./config/keys');
const app = express();

// Initiate user model
require('./models/User');

// Set up passport and session
require('./services/passportSession')(app);
require('./services/passport');

// Initiate Routes
require('./routes')(app);

// Connect to db & to express
mongoose.connect(mongoURI, (err) => {
  if (err) console.log(err);
  else {
    console.log('Database connected...');
    app.listen(port, () => {
      console.log('App up and running at http://localhost:' + port);
    });
  }
});
