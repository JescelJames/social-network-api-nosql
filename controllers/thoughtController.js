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
      // create a thought
      const thought = await Thought.create(req.body);
      // link thought to a user
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
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
  // get single thought
  async getSingleThought(req, res) {
    try{
      const thoughtSingle = await 
        Thought
          .findOne({ _id: req.params.thoughtId });

      if(!thoughtSingle) {
        return res
          .status(404)
          .json({ message: 'No thought with that ID.' })
      }
      res.json(thoughtSingle);
    }
    catch (err) {
      res.status(500).json(err);
    }
  }




};
