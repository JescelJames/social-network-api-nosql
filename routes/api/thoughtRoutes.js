const router = require('express').Router();

const { getThoughts, createThoughts, getSingleThought } = require('../../controllers/thoughtController');


// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThoughts);

router.route('/:thoughtId')
  .get(getSingleThought);

module.exports = router;
