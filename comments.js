// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();
// Use body-parser
app.use(bodyParser.json());
// Use cors
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create route
app.get('/posts/:id/comments', (req, res) => {
  // Get comments by post id
  res.send(commentsByPostId[req.params.id] || []);
});

// Create route
app.post('/posts/:id/comments', (req, res) => {
  // Create comment id
  const commentId = randomBytes(4).toString('hex');
  // Get comment content
  const { content } = req.body;
  // Get comments by post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add comment to comments array
  comments.push({ id: commentId, content });
  // Add comments array to comments object
  commentsByPostId[req.params.id] = comments;
  // Send comment to client
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});