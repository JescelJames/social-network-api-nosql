const { User, Thought }= require('../models');

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
  // get a single user
  async getSingleUser(req, res) {
    try{
      const userSingle = await 
        User
          .findOne({ _id: req.params.userId })
          .select('-__v')
          .populate('thoughts')
          .populate('friends');

      if (!userSingle) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(userSingle);

    }
    catch (err) {
      res.status(500).json(err);
    }
  },
//  delete a user and associated thoughts
  async deleteUser(req, res) {
    try {
      const userDelete = await User.findOneAndDelete(
        { _id: req.params.userId }
      );

      if(!userDelete) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      await Thought.deleteMany(
        { _id: { $in: userDelete.thoughts}}
      );
      res.json({ message: 'User and associated thoughts deleted!' })
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
  // create a user's friend and assign to a user
  // /api/users/:userId/friends/:friendId
  async addFriend(req, res) {
    try {
     
      const user = await 
        User
          .findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          );

      if(!user) {
        return res
          .status(404)
          .json({ message: 'Unable to find no user with that ID'});
      }
      

      res.json('Created a friend! 🎉');
    }
    catch (err) {
      res.status(500).json(err);
    }

  },
  // add a friend in json -- POST
  // /api/users/:userId/friends
  async addFriendJson(req, res) {
    try {
      const user = await 
        User
          .findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
          );

      if(!user) {
        return res
          .status(404)
          .json({ message: 'Friend created, but found no user with that ID'});
      }
      
      res.json('Created a friend! 🎉');
    }
    catch (err) {
      res.status(500).json(err);
    }
  },
  // update a single user by it's Id
  async updateSingleUser(req, res) {
    try{
      const userToUpdate = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }

      );
      if(!userToUpdate) {
        return res.status(404).json({ message: 'No user found with this ID. Please verify ID. '});
      }
      res.json('User updated! 🎉');
      // res.json(userToUpdate);

    }
    catch (err) {
      res.status(500).json(err);
    }

  },
  // /api/users/:userId/friends/:friendId
  async deleteAFriend(req, res) {
    try {
     
      const user = await 
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          );

      if(!user) {
        return res
          .status(404)
          .json({ message: 'Unable to find no user with that ID'});
      }
      

      res.json('Deleted a friend from a user');
    }
    catch (err) {
      res.status(500).json(err);
    }

  },


};