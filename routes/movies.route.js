import express from "express";
import {
  getMovies,
  getMoviebyID,
  deleteMoviebyID,
  updateMoviebyID,
  newFunction,
} from "../services/movies.service.js";
const router = express.Router();

router.get("/", async function (request, response) {
  console.log(request.query);

  //to change string to num for rating
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  //Cursor-PAgination---to show top 20 results
  const movies = await getMovies(request);
  //console.log(movies);
  response.send(movies);
});
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  //Db.movies.findOne({id:'100'})
  /*   console.log(request.params, id);
    const movie = movies.find((mv) => mv.id == id); */
  const movie = await getMoviebyID(id);
  console.log(movie);
  movie
    ? response.send(movie)
    : response.status(404).send({ message: "movie not found" });
});
//delete
router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  //Db.movies.deleteOne({id:'100'})
  /*   console.log(request.params, id);
    const movie = movies.find((mv) => mv.id == id); */
  const result = await deleteMoviebyID(id);
  console.log(result);
  result.deletedCount > 0
    ? response.send({ message: "movie deleted successfully" })
    : response.status(404).send({ message: "movie not found" });
});
//put
router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;
  //Db.movies.updateOne({id:'99'},{$set:{rating:9}})
  /*   console.log(request.params, id);
    const movie = movies.find((mv) => mv.id == id); */
  const result = await updateMoviebyID(id, data);
  console.log(result);
  response.send(result);
});
//middleware - expressjson-js object---lik security guard before any function
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await newFunction(data);
  response.send(result);
});
export default router;
