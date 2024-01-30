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
  // create a thought and assign to a user
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
      res.json('Created a thought! 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // get single thought
  async getSingleThought(req, res) {
    try {
      const thoughtSingle = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thoughtSingle) {
        return res
          .status(404)
          .json({ message: "No thought with that ID." });
      }
      res.json(thoughtSingle);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a thought by it's _id
  async deleteAThought(req,res) {
    try{
      const thoughtToDelete = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId }
      );
      if(!thoughtToDelete) {
        return res
          .status(404)
          .json({ message: 'No thought identified with this ID. Please verify ID.' });
      }
      res.json('Thought deleted! ')
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
  //update a single thought
  async updateAThought (req, res) {
    try {
      const thoughtToUpdate = await Thought
        .findByIdAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true}
        )
        if(!thoughtToUpdate) {
          return res.status(404).json({ message: 'No thought found with this ID. Please verify ID.'})
        }
        res.json('Updated A Thought')
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
  // api/thoughts/:thoughtId/reactions
  async addAReactionJson(req, res) {
    try {
      const reactionToAdd = await 
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId},
          { $addToSet: { reactions: req.body} },
          { runValidators: true, new: true }
        );

      if (!reactionToAdd) {
          return res
            .status(404)
            .json({ message: 'Unable to find thought with that ID' });
      }

      // res.json('Created reactions in a thought! 🎉');
      res.json(reactionToAdd);

    } 
    catch (err) {
      res.status(500).json(err);
    }
  }


}; //ends here
