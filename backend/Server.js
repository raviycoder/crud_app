const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const UserModel = require("./model/User");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  // Your application logic goes here
});

app.get("/", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((error) => res.json(error));
});

app.post('/create', (req, res) => {
  UserModel.create(req.body)
  .then(user => res.json(user))
  .catch(error => res.json(error))
})

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id: id}, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  }).then(user => res.json(user))
  .catch(error => res.json(error))
})

app.delete('/deleteuser/:id', (req,res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id:id})
  .then(response => res.json(response))
  .catch(error => res.json(error))
})

app.listen(3001, () => {
  console.log("Server is Running");
});
