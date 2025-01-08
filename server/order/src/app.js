const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const indexRouter = require('./routes');
app.use('/', indexRouter);

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
  console.log(`server start: ${PORT}`);
});
