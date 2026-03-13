"use client";
import { log } from "console";
import { useState } from "react";
import { createUser, createMovie } from "@/lib/api"
import { title } from "process";

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleUserSubmit() {
    await createUser(name, email);
    console.log('user posted');
  }

  const [movie, setMovie] = useState("")

  async function handleMovieSubmit() {
    console.log('test handle');
    
    await createMovie(movie);
    console.log('movie created');
  }

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
        <form onSubmit={(e) => { e.preventDefault(); handleMovieSubmit()}}>
          <input value={movie} onChange={(e) => {setMovie(e.target.value); console.log('test change')}} placeholder="Movie" />
          <button type="submit">Add Movie</button>
        </form>
      </div>
    </>
  );
}
