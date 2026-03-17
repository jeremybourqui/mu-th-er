'use client'

import { useEffect, useState } from "react";
import { Movie, User } from "@/db/schema";
import { createUser, getUsers, removeUser, createMovie, getMovies, removeMovie, addMovietoWatchlist, getWatchlist, removeMoviefromWatchlist } from "@/lib/api";
import styles from "./page.module.css";



export default function dashboard() {

    const userId = 1;

    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [watchlist, setWatchlist] = useState<Movie[]>([]);

    async function fetchMovies() {
        const movies = await getMovies();
        setMovieList(movies);
    }

    async function fetchWatchlist() {
        const watchlist = await getWatchlist();
        setWatchlist(watchlist);
    }

    useEffect(() => {
        async function runEffect() {
            fetchMovies();
            // fetchUsers();
            fetchWatchlist();
        }
        runEffect();
        
    }, []);

    async function handleAddMovieToWatchlist(userId: number, movieId: number) {
        addMovietoWatchlist(userId, movieId);
        fetchWatchlist();
        console.log(watchlist);
        
    }

    async function handleRemoveMovieFromWatchlist(userId: number, movieId: number) {
        await removeMoviefromWatchlist({ userId, movieId });
        await fetchWatchlist();
    }

    return (
        <section className={styles.section}>
            <div>
                <h3>movies available</h3>
                <ul>
                    {movieList.length > 0 && (
                        movieList.map((movie) =>
                            <li key={movie.id}>
                                {movie.original_title}{" "}
                                <button onClick={() => handleAddMovieToWatchlist(userId, movie.id)}>+</button>
                            </li>
                        ))}
                </ul>
            </div>
            <div>
                <h3>Watch list</h3>
                <ul>
                    {watchlist.length > 0 && (
                        watchlist.map((wmovie) =>
                            <li key={wmovie.id}>
                                {wmovie.original_title}{" "}
                                <button onClick={() => handleRemoveMovieFromWatchlist(userId, wmovie.id )}>-</button>
                            </li>
                        ))}
                </ul>
            </div>
        </section >
    )
}