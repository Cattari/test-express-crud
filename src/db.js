const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const dbFile = process.env.NODE_ENV === 'test' ? 'testDb.json' : 'db.json';

const adapter = new FileSync(dbFile);
const db = low(adapter);

exports.db = db;
