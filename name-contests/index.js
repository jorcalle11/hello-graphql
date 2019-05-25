'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
    customFormatErrorFn
  })
);

function customFormatErrorFn(error) {
  return {
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  };
}

app.listen(port, () => {
  console.log(`server running at localhost:${port}`);
});
