require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());
const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
//import fichier
const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");
const { hashPassword } = require("./auth.js");

app.post("/api/users", hashPassword, usersHandlers.postUser);


app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
//express 2
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
//express 3
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", usersHandlers.postUsers);
//express 4
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", usersHandlers.updateUsers);
//express 5
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users", usersHandlers.deleteUsers);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
