const router = require('express').Router();

const { getThoughts, createThoughts, getSingleThought, deleteAThought, updateAThought } = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThoughts);

router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteAThought)
  .put(updateAThought);

module.exports = router;
