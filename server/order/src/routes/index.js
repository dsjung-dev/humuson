const express = require('express');
const apiRouter = require('./api');

const router = express.Router();

router.use('/api', apiRouter);

router.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = router;
