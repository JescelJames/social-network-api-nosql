const router = require('express').Router();

const { getThoughts, createThoughts, getSingleThought, deleteAThought } = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThoughts);

router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteAThought);

module.exports = router;
