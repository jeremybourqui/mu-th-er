"use client";
import { useState, useEffect } from "react";
import { createUser, createMovie, getMovies } from "@/lib/api"
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

  const [movieList, setMovieList] = useState<Movie[]>([]);

  useEffect(() => {
    async function runEffect() {
      fetchMovies();
    }
    runEffect();
  }, []);


  return (
    <>
      <div>
        <form onSubmit={(e) => { e.preventDefault(); handleUserSubmit(); }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <button type="submit">Add User</button>
        </form>
      </div>
      <div>
        <form onSubmit={(e) => { e.preventDefault(); handleMovieSubmit() }}>
          <input value={movie} onChange={(e) => { setMovie(e.target.value); console.log('test change') }} placeholder="Movie" />
          <button type="submit">Add Movie</button>
        </form>
        <ul>
          {movieList.length > 0 && (

            movieList.map((movie) =>
              <li key={movie.id}>
                {movie.original_title}
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
}
