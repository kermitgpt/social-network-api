const { connect, connection } = require("mongoose");
require("dotenv").config();

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/socialnetwork_db";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
