"use client";
import { log } from "console";
import { useState } from "react";
import { createUser } from "@/lib/api"

export default function Home() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit() {
    await createUser(name, email);

    console.log('user posted');
    
  }

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
