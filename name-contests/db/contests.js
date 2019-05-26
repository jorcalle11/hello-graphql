'use strict';

const mongoDB = require('./mongoConnection');

mongoDB
  .connect()
  .then(db => {
    console.log('Connected successfully to MongoDB');
    db.collection('users')
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
      .then(console.log);
  })
  .then(mongoDB.disconnect);
