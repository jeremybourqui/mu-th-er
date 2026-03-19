'use client'

import { useEffect, useState } from "react";
import { Movie, User, Watchlist, WatchlistWithMovie } from "@/db/schema";
import { addUser, getUsers, removeUser, addMovie, getMovies, removeMovie, addMovietoWatchlist, getWatchlist, removeMoviefromWatchlist, getCommonWatchlist } from "@/lib/api";
import styles from "./page.module.css";

export default function dashboard() {

    const userId = 14;

    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [watchlist, setWatchlist] = useState<WatchlistWithMovie[]>([]);
    const [commonWatchlist, setCommonWatchlist] = useState<WatchlistWithMovie[]>([])

    async function fetchMovies() {
        const movies = await getMovies();
        setMovieList(movies);
    }

    async function fetchWatchlist() {
        const watchlist = await getWatchlist(userId);
        setWatchlist(watchlist);
    }

    async function fetchCommonWatchlist() {
        const commonWatchlist = await getCommonWatchlist(userId);
        setCommonWatchlist(commonWatchlist);
    }

    useEffect(() => {
        async function runEffect() {
            fetchMovies();
            fetchWatchlist();
            fetchCommonWatchlist();
        }
        runEffect();
    }, []);

    async function handleAddMovieToWatchlist(userId: number, movieId: number) {
        await addMovietoWatchlist(userId, movieId);
        await fetchWatchlist();
        await fetchCommonWatchlist();
    }

    async function handleRemoveMovieFromWatchlist(watchlistId: number) {
        await removeMoviefromWatchlist(watchlistId);
        await fetchWatchlist();
        await fetchCommonWatchlist();
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
                            return <li key={watchlist.watchlistId}>
                                {watchlist.movieOriginalTitle}{" "}
                                <button onClick={() => handleRemoveMovieFromWatchlist(watchlist.watchlistId)}>-</button>
                            </li>
                        }
                        ))}
                </ul>
            </div>
            <div>
                <h3>Common watch list</h3>
                <ul>
                    {commonWatchlist.length > 0 && (
                        commonWatchlist.map((commonWatchlist, index) => {
                            return <li key={index}>
                                {commonWatchlist.movieOriginalTitle}{" "}
                            </li>
                        }
                        ))}
                </ul>
            </div>
        </section >
    )
}