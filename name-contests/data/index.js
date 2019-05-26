'use strict';

const humps = require('humps');

module.exports = function main(dbConnection) {
  function getUserByApiKey(key) {
    const query = dbConnection
      .select('*')
      .from('users')
      .where('api_key', key);

    console.log(query.toQuery());
    return query.then(rows => humps.camelizeKeys(rows.shift()));
  }

  function getUserById(userId) {
    const query = dbConnection
      .select('*')
      .from('users')
      .where('id', userId);

    console.log(query.toQuery());
    return query.then(rows => humps.camelizeKeys(rows.shift()));
  }

  function getContestsByUserId(userId) {
    const query = dbConnection
      .select('*')
      .from('contests')
      .where('created_by', userId);

    console.log(query.toQuery());
    return query.map(row => humps.camelizeKeys(row));
  }

  function getNames(contestId) {
    const query = dbConnection
      .select('*')
      .from('names')
      .where('contest_id', contestId);

    console.log(query.toQuery());
    return query.map(row => humps.camelizeKeys(row));
  }

  function getCountsByUserId(userId, fieldName) {
    return dbConnection
      .collection('users')
      .findOne({ userId })
      .then(userCount => userCount[fieldName]);
  }

  return {
    getUserByApiKey,
    getContestsByUserId,
    getCountsByUserId,
    getNames,
    getUserById
  };
};
