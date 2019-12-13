// code away!
const express = require('express');
const userRouter = require('./users/userRouter');
const serverRoute = require('./server');

const server = express();
server.use(express.json());

server.use('/', serverRoute);
server.use('/users', userRouter);

server.use((req, res) => {
  res.status(404).json({ message: 'Route was not Found' });
});

server.use((err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .json({ message: 'An internal error occured, Please try again later.' });
});

server.listen(4000, () => {
  console.log('\n*** Server running on http://localhost:4000 ***\n');
});
