const express = require('express');
const apiRouter = require('./api');

const router = express.Router();

const VALID_API_KEYS = process.env.API_KEYS.split(',');

const validateApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
    return res.status(403).json({ message: 'API 키가 유효하지 않습니다.' });
  }

  next();
};

router.use('/api', validateApiKey, apiRouter);

router.get('/ping', (req, res) => {
  res.send('pong');
});

module.exports = router;
