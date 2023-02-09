import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import connectMongo from "./db";
import User from "../models/User";

export async function createUser({ name, username, password }) {
  await connectMongo();
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  let hashPassword = await bcrypt.hash(password, 12);
  await User.create({
    id: uuidv4(),
    createdAt: Date.now(),
    name,
    username,
    password: hashPassword,
  });

  // This is an in memory store for users, there is no data persistence without a proper DB
  return { name };
}

// Here you should lookup for the user in your DB
export async function findUser({ username }) {
  await connectMongo();
  // This is an in memory store for users, there is no data persistence without a proper DB
  return await User.findOne({ username: username });
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  return await bcrypt.compare(inputPassword, user.password);
}
