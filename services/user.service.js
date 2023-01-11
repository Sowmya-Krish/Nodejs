import { client } from "../index.js";
import bcrypt from "bcrypt";

//db.users.insertOne(data)
export async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  //gensalt willtake time,so we need to await(whenever there is wait time)
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(salt);
  console.log(hashedPassword);
  return hashedPassword;
}
export async function createUser(data) {
  return await client.db("b40wd").collection("users").insertOne(data);
}
//hash value will be displayed in terminal
export async function getUserByName(username) {
  return await client
    .db("b40wd")
    .collection("users")
    .findOne({ username: username });
}
