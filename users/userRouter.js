const express = require('express');
const db = require('./userDb')
const postdb = require('../posts/postDb')

const router = express.Router();
router.use('/:id', validateUserId)


//good
router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
    .then(result => {
      res.status(201).json(result)
    })
});

//good
router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  postdb.insert(req.body)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry, something went wrong' })
    })
});

//good
router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(result => {
      res.status(200).json(result)
    })
});

//good
router.get('/:id', (req, res) => {
  res.status(200).json(req.user)
});

//good
router.get('/:id/posts', (req, res) => {
  // do your magic!
  db.getUserPosts(req.user.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry Something went wrong' })
    })
});


router.delete('/:id', (req, res) => {
  // do your magic!
  db.remove(req.user.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry Something went wrong' })
    })
});

router.put('/:id', validateUser, (req, res) => {
  // do your magic!
  db.update(req.user.id, req.body)
    .then(result => {
      res.status(200).json({ ...req.body, id: req.user.id })
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Sorry Something went wrong' })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  const userId = req.params.id ? req.params.id : -1
  db.getById(userId)
    .then(result => {
      if (!result) {
        res.status(400).json({ message: "invalid user id" })
      }
      else {
        req.user = result
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong' })
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing user data" })
  }
  else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" })
  }
  else {
    next()
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ message: "missing post data" })
  }
  else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" })
  }
  else {
    req.body.user_id = req.params.id
    next()
  }
}

module.exports = router;
