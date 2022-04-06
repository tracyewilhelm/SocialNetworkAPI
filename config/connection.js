const { connect, connection } = require("mongoose");
//this is the connection to mongoDB. We are exporting it to the server.js file
connect("mongodb://localhost/socialNetworkAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
