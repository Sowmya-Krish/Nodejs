import express from "express";
import { client } from "../index.js";
const router = express.Router();

router.get("/", async function (request, response) {
  console.log(request.query);

  //to change string to num for rating
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  //Cursor-PAgination---to show top 20 results
  const movies = await client
    .db("b40wd")
    .collection("movies")
    .find(request.query)
    .toArray();
  //console.log(movies);
  response.send(movies);
});
router.get("/:id", async function (request, response) {
  const { id } = request.params;
  //Db.movies.findOne({id:'100'})
  /*   console.log(request.params, id);
    const movie = movies.find((mv) => mv.id == id); */
  const movie = await client
    .db("b40wd")
    .collection("movies")
    .findOne({ id: id });
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
  const result = await client
    .db("b40wd")
    .collection("movies")
    .deleteOne({ id: id });
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
  const result = await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
  console.log(result);
  response.send(result);
});
//middleware - expressjson-js object---lik security guard before any function
router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client.db("b40wd").collection("movies").insertMany(data);
  response.send(result);
});
export default router;
