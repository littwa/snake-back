const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const usersControllers = require("./users/user.controllers");

class Server {
  constructor() {
    this.server = null;
  }

  async startServer() {
    this.initServer();
    this.initMiddleware();
    this.initRoutrsNative();

    this.listenServer();
    await this.initDatabase();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(morgan("combined"));
    this.server.use(cors());
  }

  initRoutrsNative() {
    this.server.post("/add-users", usersControllers.addUser);
    this.server.get("/get-users", usersControllers.getBestUsers);
  }

  async initDatabase() {
    const option = { useUnifiedTopology: true, useNewUrlParser: true };
    try {
      await mongoose.connect(process.env.MONGODB_URL, option);
      console.log("Database connection successful");
    } catch (err) {
      console.log(`Server was closed with connect to db`);
      process.exit(1);
    }
  }

  listenServer() {
    this.server.listen(process.env.PORT, () => console.log("Started Port", process.env.PORT));
  }
}

module.exports = new Server().startServer();
