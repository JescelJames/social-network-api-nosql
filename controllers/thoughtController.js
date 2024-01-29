const { Thought, User } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughtAll = await Thought.find();
      res.json(thoughtAll);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createThoughts(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thought: thought._id } }
      );
      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }
      res.json("Created a thought! 🎉");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
