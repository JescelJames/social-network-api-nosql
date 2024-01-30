const router = require('express').Router();

const { getThoughts, createThoughts, getSingleThought, deleteAThought, updateAThought, addAReactionJson, deleteAReactionJson } = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThoughts);

// /api/thoughts/:thoughId  
router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteAThought)
  .put(updateAThought);

// /api/thoughts/:thoughId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addAReactionJson)
  .delete(deleteAReactionJson);



module.exports = router;
