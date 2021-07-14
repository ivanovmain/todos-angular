const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String },
  userId: { type: String }
});

module.exports = mongoose.model("todo", todoSchema);