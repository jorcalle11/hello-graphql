'use strict';

const knex = require('knex');
let instance = null;

function connect() {
  if (!instance) {
    console.log('creating knex instance...');
    const connectionOption = {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'test',
      database: process.env.DB_NAME || 'name_contests'
    };

    instance = knex({
      client: 'mysql',
      connection: connectionOption,
      debug: true
    });

    poolStats('---this is the pool conection---');
  }

  return instance;
}

// check pool status, both are 0
function poolStats(msg) {
  console.log(msg);
  console.log({
    numUsed: instance.client.pool.numUsed(),
    numFree: instance.client.pool.numFree()
  });
}

function disconnect() {
  if (!instance) return;
  console.log('Destroying knex connections...');
  poolStats('---this is the pool conection before to destroy---');
  return instance.destroy().then(() => {
    console.log('conection destroyed');
    instance = null;
  });
}

module.exports = {
  connect,
  disconnect,
  poolStats
};
