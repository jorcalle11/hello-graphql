'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const DataLoader = require('dataloader');

const schema = require('./schema');
const db = require('./db');
const data = require('./data');

const app = express();
const port = process.env.PORT || 4000;

app.use('/graphql', async (req, res) => {
  const mysqlPool = db.mysql.connect();
  const mongoPool = await db.mongo.connect();

  // the goal here is minimize the queries a single request is doing
  const loaders = {
    usersByIds: new DataLoader(data(mysqlPool).getUsersByIds),
    usersByKeys: new DataLoader(data(mysqlPool).getUsersByApiKeys),
    namesByContestIds: new DataLoader(data(mysqlPool).getNamesByContestIds),
    getContestsByUserIds: new DataLoader(data(mysqlPool).getContestsByUserIds),
    getCountsByUserIds: new DataLoader(data(mongoPool).getCountsByUserIds)
  };

  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
    customFormatErrorFn,
    context: { mongoPool, loaders }
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

async function disconnectDbs() {
  await db.mysql.disconnect();
  await db.mongo.disconnect();
}

function customFormatErrorFn(error) {
  return {
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  };
}

async function existWithError(error) {
  await disconnectDbs();
  console.error(error.message);
  console.error(error.stack || '');
  process.exit(1);
}
