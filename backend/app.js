const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
 
require("./config/database").connect();
const express = require("express");

const app = express();

app.use(cors())

app.use(express.json());

const User = require("./model/user");
const Todo = require("./model/todo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");


app.post("/register", async (req, res) => {
  
  try {
  
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

// Login
app.post("/login", async (req, res) => {
  
  try {
   
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
   
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      res.status(200).json(user);
    }
    res.status(400).send({
      msg: "Invalid Credentials"
    });
  } catch (err) {
    console.log(err);
  }
});


app.post("/addtodo", auth, async (req, res) => {
  console.log('req', req.body)
  const {userId, title} = req.body;

  console.log('userId', userId)

  const todo = await Todo.create({
    title: title,
    userId: userId
  });

  res.status(200).send(todo);
});

app.post("/todos", auth, async (req, res) => {
  console.log('req', req.body)
  const {userId} = req.body;

  const todos = await Todo.find({ userId });


  res.status(200).send(todos);
});

app.post("/deletetodo", auth, async (req, res) => {
  console.log('req', req.body)
  const {id} = req.body;

  const todo = await Todo.findOneAndRemove({ _id: id });


  res.status(200).send(todo);
});

app.post("/getuser", auth, async (req, res) => {
  
  const {user} = req;

  const findedUser = await User.findOne({ _id: user.user_id });

  res.status(200).send(findedUser);
});

module.exports = app;