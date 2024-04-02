function MoviesList({ movies }) {
  return (
    <ul>
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h1>{movie.title}</h1>
          <p>{movie.year}</p>
          <img
            src={movie.poster}
            alt={`Imagen de la pelicula ${movie.title}`}
          />
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResults() {
  return <p>No se encontraron resultados</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return (
    <div>{hasMovies ? <MoviesList movies={movies} /> : NoMoviesResults()}</div>
  );
}
