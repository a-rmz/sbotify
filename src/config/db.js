
const path = (process.env.NODE_ENV !== 'production') ? 'credentials.sqlite3' : './db/credentials.sqlite3';

module.exports = {
  dbPath: path,
  slack: {
    dbTable: 'SlackCredentials'
  }
};
