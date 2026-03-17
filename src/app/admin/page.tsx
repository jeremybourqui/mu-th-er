'use client'

import { useState, useEffect } from "react";
import { createUser, getUsers, removeUser, createMovie, getMovies, removeMovie } from "@/lib/api"
import { Movie, User } from "@/db/schema";
import styles from "./page.module.css";
import { Console, log } from "console";

import Link from "next/link"

export default function admin() {

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

  async function fetchUsers() {
    const users = await getUsers()
    setUserList(users);
    console.log()
  }

  async function handleMovieSubmit() {
    await createMovie(movie);
    fetchMovies();
  }

  async function handleMovieDelete(id: number) {
    await removeMovie(id);
    fetchMovies();
  }

  async function handleUserDelete(id: number) {
    await removeUser(id);
    fetchUsers();
  }

  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    async function runEffect() {
      fetchMovies();
      fetchUsers();
    }
    runEffect();
  }, []);


  return (
    <section className={styles.section}>
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
      <div className={styles.contentColumns}>
        <div>
          <h3>user</h3>
          <ul>
            {userList.length > 0 && (
              userList.map((user) =>
                <li key={user.id}>
                  {user.name}
                  <button onClick={() => handleUserDelete(user.id)}>X</button>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h3>movie</h3>
          <ul>
            {movieList.length > 0 && (
              movieList.map((movie) =>
                <li key={movie.id}>
                  {movie.original_title}
                  <button onClick={() => handleMovieDelete(movie.id)}>X</button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}