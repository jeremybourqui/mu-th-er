"use client";
import { useState, useEffect } from "react";
import { createUser, getUsers, removeUser, createMovie, getMovies, removeMovie } from "@/lib/api"
import { Movie, User } from "@/db/schema";
import Link from "next/link";
import styles from "./page.module.css";
import { Console, log } from "console";
import dashboard from "./dashboard/page";

export default function Home() {

  return (
    <section className={styles.section}>
      <h1>MU-TH-ER</h1>
      <h2>Multi-User Tracking Hub for Entertainment Resources</h2>
      <p>Login</p>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/admin">Admin</Link>
    </section>
  );
}