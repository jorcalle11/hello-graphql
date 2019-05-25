'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');
const db = require('./db');

const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', (req, res) => {
  const mysqlPool = db.mysql.connect();

  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
    customFormatErrorFn,
    context: { mysqlPool }
  })(req, res);
});

app.listen(port, () => {
  console.log(`server running at localhost:${port}`);
});

process.on('uncaughtException', existWithError);
process.on('unhandledRejection', existWithError);
process.on('SIGINT', existWithError);

function customFormatErrorFn(error) {
  db.mysql.disconnect();
  return {
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  };
}

function existWithError(error) {
  db.mysql.disconnect();
  process.exit(1);
}
