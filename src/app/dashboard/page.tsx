'use client'

import { useEffect, useState } from "react";
import { Movie, User, Watchlist, WatchlistWithMovie } from "@/db/schema";
import { createUser, getUsers, removeUser, createMovie, getMovies, removeMovie, addMovietoWatchlist, getWatchlist, removeMoviefromWatchlist } from "@/lib/api";
import styles from "./page.module.css";



export default function dashboard() {

    const userId = 1;

    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [watchlist, setWatchlist] = useState<WatchlistWithMovie[]>([]);

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

    async function handleRemoveMovieFromWatchlist(watchlistId: number) {
        console.log({habndel: watchlistId})
        await removeMoviefromWatchlist(watchlistId);
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
                        watchlist.map((watchlist) => {
                            console.log({click: watchlist.watchlistId})
                            return <li key={watchlist.watchlistId}>
                                {watchlist.movieOriginalTitle}{" "}
                                <button onClick={() => handleRemoveMovieFromWatchlist(watchlist.watchlistId)}>-</button>
                            </li>
                        }
                    ))}
                </ul>
            </div>
        </section >
    )
}