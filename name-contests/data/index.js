'use strict';

const humps = require('humps');

module.exports = function main(dbConnection) {
  function getUserByApiKey(key) {
    return dbConnection
      .select('*')
      .from('users')
      .where('api_key', key)
      .then(rows => humps.camelizeKeys(rows.shift()));
  }

  function getContestsByUserId(userId) {
    return dbConnection
      .select('*')
      .from('contests')
      .where('created_by', userId)
      .map(row => humps.camelizeKeys(row));
  }

  return { getUserByApiKey, getContestsByUserId };
};
