const Thought = require('../models/Thought');

module.exports = {

  async getThoughts(req, res) {
    try{
      const thoughtAll = await Thought.find();
      res.json(thoughtAll);
    }
    catch (err) {
      res.status(500).json(err);
    }
  }, 

  async createThoughts(req, res) {
    try{
      const thoughtCreate = await Thought.create(req.body);
      res.json(thoughtCreate);
    }
    catch (err) {
      res.status(500).json(err);
    }

  }




};