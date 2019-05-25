'use strict';

const { MongoClient } = require('mongodb');
const assert = require('assert');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DATABASE = process.env.DATABASE || 'contests';

MongoClient.connect(MONGO_URL, (err, client) => {
  assert.equal(null, err);
  console.log('Connected successfully to MongoDB');

  client
    .db(DATABASE)
    .collection('users')
    .insertMany([
      {
        userId: 1,
        contestsCount: 3,
        namesCount: 0,
        votesCount: 4
      },
      {
        userId: 2,
        contestsCount: 0,
        namesCount: 4,
        votesCount: 4
      }
    ])
    .then(response => {
      console.log(response);
      client.close();
    });
});
