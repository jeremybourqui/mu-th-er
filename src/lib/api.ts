export async function createUser(name: string, email: string) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  return res.json();
}

export async function createMovie(original_title: string){
  const res = await fetch("/api/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({original_title})
  });
  return res.json();
}

export async function removeMovie(id: number) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE"
  });
  return res.json();
}

export async function getMovies() {
  const res = await fetch(`/api/movies`);
  return res.json()
}