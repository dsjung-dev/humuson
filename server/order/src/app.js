const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const indexRouter = require('./routes');
app.use('/', indexRouter);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`server start: ${PORT}`);
});
