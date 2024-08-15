// requiring mongoose db package
const { connect, connection } = require("mongoose");

// Connecting the database
const connectionString = `mongodb://127.0.0.1:27017/connectifyDB`;
connect(connectionString);

module.exports = connection;
