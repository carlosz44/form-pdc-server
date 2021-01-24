const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Auth", usersSchema);
