const express = require('express');
const db = require('./postDb')

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  db.getByUserId(req.user.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry Something went wrong' })
    })
});

router.get('/:postid', (req, res) => {
  // do your magic!

});

router.delete('/:postid', (req, res) => {
  // do your magic!
});

router.put('/:postid', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
