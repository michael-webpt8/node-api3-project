const express = require('express');
const userDb = require('./userDb');

const router = express.Router();

/**
 * Endpoint: `/users`
 * method: POST
 * status: 400, 200, 500
 */
router.post('/', (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "name is required" })
  }
  const newName = {
    name: req.body.name
  }
  userDb.insert(newName)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "post server error" })
    })
});

/**
 *
 */
router.post('/:id/posts', (req, res) => {
  // do your magic!

});

/**
 * Endpoint: `/users`
 * method: GET
 * status: 200, 404, 500
 */
router.get('/', (req, res) => {
  userDb.get()
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({ message: "missing user data." })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Post not working" })
    })
});

/**
 * Endpoint: `/users/:id`
 * method: GET
 * status: 200, 400, 500
 */
router.get('/:id', (req, res) => {
  userDb.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json({ message: "user ID not found" })
      }
    }).catch(err => {
      res.status(500).json({ message: "server error" })
    })
});

/**
 * Endpoint: `/users/:id/posts`
 * method: GET
 * status: 200, 400, 500
 */
router.get('/:id/posts', (req, res) => {
  // do your magic!
  userDb.getUserPosts(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(400).json({ message: "post ID not found" })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Server error id posts" })
    })
});

/**
 * Endpoint: `/users/:id`
 * method: DELETE
 * status: 404, 200, 500
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  userDb.getById(id)
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: "user not found" })
      }
      userDb.remove(id).then(data => {
        res.status(200).json({ message: "The name has been removed" })
      })
        .catch(err => {
          res.status(500).json({ errorMessage: "id delete error" })
        })
    })

});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  userDb.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next()
      } else {
        res.status(400).json({ message: "Invalid user id" })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting User" })
    })
  next()

}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
