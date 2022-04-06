const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

//boiler plate server start up and connection to the mongo db using the import from config
