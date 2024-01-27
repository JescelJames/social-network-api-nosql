// DEPENDENCIES / REQUIREMENTS __________
  const express = require('express');
  const db = require('./config/connection');
  const routes = require('./routes');
  
// APP/PORT ____________________________  
  const app  = express();
  const PORT = process.env.PORT || 3001;

// MIDDLEWARES ___________________________
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(routes);

// START SERVER
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for running on port ${PORT}.`);
    });
  });  

