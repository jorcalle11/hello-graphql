'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema');
const db = require('./db');

const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', async (req, res) => {
  const mysqlPool = db.mysql.connect();
  const mongoPool = await db.mongo.connect();

  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
    customFormatErrorFn,
    context: { mysqlPool, mongoPool }
  })(req, res);
});

db.mongo
  .connect()
  .then(startServer)
  .catch(existWithError);

process.on('uncaughtException', existWithError);
process.on('unhandledRejection', existWithError);
process.on('SIGINT', existWithError);

function startServer() {
  app.listen(port, () => {
    console.log(`server running at localhost:${port}`);
  });
}

function disconnectDbs() {
  db.mysql.disconnect();
  db.mongo.disconnect();
}

function customFormatErrorFn(error) {
  disconnectDbs();
  return {
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  };
}

function existWithError(error) {
  disconnectDbs();
  console.error(error.message);
  console.error(error.stack || '');
  process.exit(1);
}
