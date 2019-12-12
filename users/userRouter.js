const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

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
  const id = req.params.id;
  userDb.getById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: "cannot find id" })
      }
      if (!req.body.text) {
        res.status(400).json({ message: "Text is required" })
      }
      const newText = {
        text: req.body.text
      }
      postDb.update(id, newText)
        .then(updatePost => {
          res.status(200).json(updatePost)
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ errorMessage: "server error on Post with ID" })
        })
    })

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
router.delete('/:id', validateUserId, (req, res) => {
  //const id = req.params.id;
  // userDb.getById(id)
  //   .then(data => {
  //     if (!data) {
  //       return res.status(404).json({ message: "user not found" })
  //     }
  userDb.remove(req.user.id).then(data => {
    res.status(200).json({ message: "The name has been removed" })
  })
    .catch(err => {
      res.status(500).json({ errorMessage: "id delete error" })
    })
})


router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  const id = req.params.id;
  userDb.update(id, req.body)
    .then(update => {
      res.status(200).json(update)
    })
    .catch(err => {
      console.log(err);
      // res.status(500).json({ errorMessage: "Did not update" })
      next(err)
    })
})

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  userDb.getById(id)
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
      next(err)
    })


}

function validateUser(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ message: "missing user data" })
  }
  next()
}

// function validatePost(req, res, next) {
//   if (!req.body.text) {
//     return res.status(400).json({ message: "missing required text field" })
//   }
//   next()

// }

module.exports = router;
