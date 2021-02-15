const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const UserShema = new Schema({
  name: { type: String, default: "Player1" },
  level: { type: Number, default: 0 },
});

module.exports = model("User", UserShema);
