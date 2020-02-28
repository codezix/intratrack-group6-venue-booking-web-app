const mongoose = require("mongoose");

const { Schema } = mongoose;

const UsersSchema = new Schema({
  authId: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5
  },
  phone: {
    type: Number,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("Users", UsersSchema);
module.exports = User;
