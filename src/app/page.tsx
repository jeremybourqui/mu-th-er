"use client";
import { useState, useEffect } from "react";
import { createUser, createMovie, getMovies, removeMovie } from "@/lib/api"
import { Movie } from "@/db/schema"
import { log } from "console";

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleUserSubmit() {
    await createUser(name, email);
  }

  const [movie, setMovie] = useState("")

  async function fetchMovies() {
    const movies = await getMovies();
    setMovieList(movies);
  }

  async function handleMovieSubmit() {
    await createMovie(movie);
    fetchMovies();
  }

  async function handleMovieDelete(id: number) {
    await removeMovie(id)
    fetchMovies();
  }

  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    async function runEffect() {
      fetchMovies();
    }
    runEffect();
  }, []);

  return (
    <>
      <h1>MU-TH-ER</h1>
      <h2>Multi-User Tracking Hub for Entertainment Resources</h2>
      <div>
        <form onSubmit={(e) => { e.preventDefault(); handleUserSubmit(); }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <button type="submit">Add User</button>
        </form>
      </div>
      <div>
        <form onSubmit={(e) => { e.preventDefault(); handleMovieSubmit() }}>
          <input value={movie} onChange={(e) => { setMovie(e.target.value) }} placeholder="Movie" />
          <button type="submit">Add Movie</button>
        </form>
      </div>
      <div>
        <div>
          <h3>user</h3>
        </div>
        <div>
          <h3>movie</h3>
          <ul>
            {movieList.length > 0 && (
              movieList.map((movie) =>
                <li key={movie.id}>
                  {movie.original_title}
                  <button onClick={()=>handleMovieDelete(movie.id)}>X</button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}