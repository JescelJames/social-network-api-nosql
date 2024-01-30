const router = require('express').Router();

const { getUsers, createUser, getSingleUser, deleteUser, addFriend, addFriendJson, updateSingleUser, deleteAFriend } = require('../../controllers/userController');

// /api/users
router
  .route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:userId  
router
  .route('/:userId')
  .get(getSingleUser)
  .delete(deleteUser)
  .put(updateSingleUser);

// /api/users/:userId/friends/:friendId
router 
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteAFriend);


// /api/users/:userId/friends
router 
  .route('/:userId/friends')
  .post(addFriendJson);


module.exports = router;
