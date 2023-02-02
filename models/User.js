import mongoose from "mongoose";

let Schema = mongoose.Schema;
const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

let User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;