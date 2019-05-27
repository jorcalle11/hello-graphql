'use strict';

const humps = require('humps');
const groupBy = require('lodash/groupBy');

/*
  rows : [{
       id: 2,
       email: 'creative@mind.com',
       first_name: 'Creativ',
       last_name: 'Mind',
       api_key: '0000',
       created_at: 2019-05-25T16:58:53.000Z
      }
  ]
  collection: [ 2 ]
  field: 'id'
*/

function orderedFor(rows, collection, field, singleObject = true) {
  // returns the rows ordered for the collection
  const data = humps.camelizeKeys(rows);
  const inGroupsOfField = groupBy(data, field);

  return collection.map(item => {
    const itemArray = inGroupsOfField[item];

    if (itemArray) {
      return singleObject ? itemArray[0] : itemArray;
    }

    return singleObject ? {} : [];
  });
}

module.exports = { orderedFor };
