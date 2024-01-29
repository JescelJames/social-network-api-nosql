const User = require('../models/User');

module.exports = {
  // get all user
  async getUsers(req, res) {
    try{
      const userAll = await User.find();
      res.json(userAll);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try{
      const userCreate = await User.create(req.body);
      res.json(userCreate);
    }
    catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try{
      const userSingle = await User.findOne(
        { _id: req.params.userId }
      )
        .select('-__v');

      if (!userSingle) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(userSingle);

    }
    catch (err) {
      res.status(500).json(err);
    }
  }




};