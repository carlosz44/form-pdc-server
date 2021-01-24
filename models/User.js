const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  documentId: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: Number,
    required: true,
    trim: true,
  },
  retailSpaceType: {
    type: String,
    required: true,
    trim: true,
  },
  mode: {
    type: String,
    required: true,
    trim: true,
  },
  ammount: {
    type: Number,
    required: true,
    trim: true,
  },
  // contractUrl: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // depositsUrl: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  // receiptsUrl: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
});

module.exports = mongoose.model("Users", usersSchema);
