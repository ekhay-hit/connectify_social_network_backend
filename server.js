const express = require("express");
// for connection with database
const db = require("./config/connection.js");
// for route api
const routes = require("./routes");
// path file system
const cwd = process.cwd();

// initializing the port
const PORT = process.env.PORT || 3001;
// initializing the app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Sever running on the post ${PORT}`);
  });
});
