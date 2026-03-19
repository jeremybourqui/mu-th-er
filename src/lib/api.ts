export async function addUser(name: string, email: string) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function getUsers() {
  const res = await fetch(`/api/users`);
  return res.json();
}

export async function removeUser(id: number) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

export async function addMovie(original_title: string){
  const res = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({original_title})
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function removeMovie(id: number) {
  const res = await fetch(`/api/movies/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

export async function getMovies() {
  const res = await fetch(`/api/movies`);
  return res.json();
}

export async function getWatchlist(userId: number,) {
  const res = await fetch(`/api/watchlist/${userId}`)
  return res.json();
}

export async function addMovietoWatchlist(userId: number, movieId: number) {
  const res = await fetch(`/api/watchlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, movieId})
  });
  return res.json();
}

export async function removeMoviefromWatchlist(watchlistId: number ) {
  const res = await fetch(`/api/watchlist`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({watchlistId})
  });
  return res.json();
}

export async function getCommonWatchlist(userId: number) {
  const res = await fetch(`/api/watchlist/${userId}`)
  return res.json();
}