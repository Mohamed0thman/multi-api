const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const usersRouter = require("./routers/users");
const favorietMovieRouter = require("./routers/favorietMovie");


const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("upload"));

app.use(usersRouter);
app.use(favorietMovieRouter);


module.exports = app;
