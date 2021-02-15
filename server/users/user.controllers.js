// const ModelGoods = require("./user.model");
const ModelUsers = require("./user.model");

const path = require("path");
const {
  Types: { ObjectId },
} = require("mongoose");
const { promises: fsPromises } = require("fs");

class Controllers {
  addUser = async (req, res, next) => {
    try {
      const newUsers = await ModelUsers.create(req.body);
      return res.status(201).send(newUsers);
    } catch (err) {
      next(err.message);
    }
  };
  getBestUsers = async (req, res, next) => {
    try {
      const allUsers = await ModelUsers.find();

      let amountUsers = Object.keys(allUsers).length;
      console.log(allUsers);
      if (amountUsers > 5) {
        allUsers.sort((a, b) => b.level - a.level);
        allUsers.length = 5;
        console.log(allUsers);
      }

      return res.status(201).send(allUsers);
    } catch (err) {
      next(err.message);
    }
  };
}

module.exports = new Controllers();
