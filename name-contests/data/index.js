'use strict';

const humps = require('humps');

const utils = require('../utils');

module.exports = function main(dbConnection) {
  function getUsersByApiKeys(keys) {
    const query = dbConnection
      .select('*')
      .from('users')
      .whereIn('api_key', keys);

    console.log(query.toQuery());
    return query.then(rows => utils.orderedFor(rows, keys, 'apiKey'));
  }

  function getUsersByIds(userIds = []) {
    const query = dbConnection
      .select('*')
      .from('users')
      .whereIn('id', userIds);

    console.log(query.toQuery());
    return query.then(rows => utils.orderedFor(rows, userIds, 'id'));
  }

  function getContestsByUserIds(userIds = []) {
    const query = dbConnection
      .select('*')
      .from('contests')
      .whereIn('created_by', userIds);

    console.log(query.toQuery());
    return query.then(rows =>
      utils.orderedFor(rows, userIds, 'createdBy', false)
    );
  }

  function getNamesByContestIds(contestIds) {
    const query = dbConnection
      .select('*')
      .from('names')
      .whereIn('contest_id', contestIds);

    console.log(query.toQuery());
    return query.then(rows =>
      utils.orderedFor(rows, contestIds, 'contestId', false)
    );
  }

  function getCountsByUserId(userId, fieldName) {
    console.log(`db.collection('user').findOne({userId: ${userId}})`);

    return dbConnection
      .collection('users')
      .findOne({ userId })
      .then(userCount => userCount[fieldName]);
  }

  return {
    getContestsByUserIds,
    getCountsByUserId,
    getNamesByContestIds,
    getUsersByApiKeys,
    getUsersByIds
  };
};
