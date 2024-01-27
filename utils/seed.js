const connection = require('../config/connection');

const { User } = require('../models');
const users = require('./data');

connection.once('open', async () => {





await User.collection.insertMany(users);


})