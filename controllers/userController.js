const User = require('../models/User');

module.exports = {

  async getUsers(req, res) {
    try{
      const userAll = await User.find();
      res.json(userAll);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try{
      const userCreate = await User.create(req.body);
      res.json(userCreate);
    }
    catch (err) {
      res.status(500).json(err);
    }

  }


};