const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const IndexRouter = require('./routes/index');
app.use('/', IndexRouter);

const HomeRouter = require('./routes/home');
app.use('/home', HomeRouter);

const UserRouter = require('./routes/users');
app.use('/user', UserRouter);

const PostRouter = require('./routes/posts');
app.use('/posts', PostRouter);

mongoose.connect(process.env.DATABASE_PATH, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (error) => {
  error ? console.log(`Database Connection Failed`) : console.log(`Connected to Database`);
});

app.use((error, request, response, next) => {
  response.status(400).send({message: "Something went wrong, we're already working on it."});
});

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});

module.exports = app;