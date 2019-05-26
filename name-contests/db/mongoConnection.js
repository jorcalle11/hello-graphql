const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DATABASE = process.env.DATABASE || 'contests';

// Create a new MongoClient
const client = new MongoClient(MONGO_URL, { useNewUrlParser: true });

async function connect() {
  console.log('[MONGO_DB CONNECTION]: is connected?', client.isConnected());
  if (!client.isConnected()) {
    // Use connect method to connect to the Server
    await client.connect();
  }

  return client.db(DATABASE);
}

function disconnect() {
  if (!client.isConnected()) return;
  console.log('[MONGO_DB CONNECTION]: Destroying mongo connections...');
  return client.close().then(() => console.log('mongoDB connections closed'));
}

module.exports = { connect, disconnect };
