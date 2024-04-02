import { useCallback, useState } from "react";
import { Movies } from "./Components/MoviesList";
import { useMovies } from "./hooks/useMovies";
import { useEffect } from "react";
import { useRef } from "react";
import debounce from "just-debounce-it";
import "./App.css";

function useSearch() {
  const [search, setSearchUpdate] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda tiene q tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearchUpdate, error };
}

function App() {
  const { search, error, setSearchUpdate } = useSearch();
  const [sort, setSort] = useState(false);
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search:", search);
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleChangeInput = (e) => {
    const newSearch = e.target.value;
    setSearchUpdate(newSearch);
    debouncedGetMovies(newSearch);
  };

  return (
    <div>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChangeInput}
            value={search}
            placeholder="Avengers"
          />
          <button>Search</button>
          <p>Title A-Z:</p>
          <input onChange={handleSort} checked={sort} type="checkbox" />
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>argando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
