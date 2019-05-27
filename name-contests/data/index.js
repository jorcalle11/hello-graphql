'use strict';

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

  function getCountsByUserIds(userIds = []) {
    console.log(`db.collection('user').find({userId: {$in: ${userIds}}})`);
    return dbConnection
      .collection('users')
      .find({ userId: { $in: userIds } })
      .toArray()
      .then(rows => utils.orderedFor(rows, userIds, 'userId'));
  }

  return {
    getContestsByUserIds,
    getCountsByUserIds,
    getNamesByContestIds,
    getUsersByApiKeys,
    getUsersByIds
  };
};
