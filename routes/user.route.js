import express from "express";
import {
  createUser,
  generateHashedPassword,
  getUserByName,
} from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//middleware - expressjson-js object---lik security guard before any function
//signup
router.post("/signup", async function (request, response) {
  const { username, password } = request.body;
  const userFromDB = await getUserByName(username);
  console.log(userFromDB);

  if (userFromDB) {
    response.status(400).send({ message: "Username already exists" });
  } else if (password.length < 8) {
    response
      .status(400)
      .send({ message: "Password must be atleast 8 characters" });
  } else {
    const hashedPassword = await generateHashedPassword(password);
    const result = await createUser({
      username: username,
      password: hashedPassword,
    });
    response.send(result);
  }
});

router.post("/login", async function (request, response) {
  const { username, password } = request.body;
  const userFromDB = await getUserByName(username);
  console.log(userFromDB);

  if (!userFromDB) {
    response.status(401).send({ message: "incorrect username or password" });
  } else {
    const storedDBPassword = userFromDB.password;
    //to view password(decrypt)
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);
    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY);
      response.send({ message: "successfull login", token: token });
    } else {
      response.status(401).send({ message: "login failed" });
    }
  }
});
export default router;
