import { client } from "../index.js";

export async function newFunction(data) {
  return await client.db("b40wd").collection("movies").insertMany(data);
}

export async function updateMoviebyID(id, data) {
  return await client
    .db("b40wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}

export async function deleteMoviebyID(id) {
  return await client.db("b40wd").collection("movies").deleteOne({ id: id });
}

export async function getMoviebyID(id) {
  return await client.db("b40wd").collection("movies").findOne({ id: id });
}

export async function getMovies(request) {
  return await client
    .db("b40wd")
    .collection("movies")
    .find(request.query)
    .toArray();
}
