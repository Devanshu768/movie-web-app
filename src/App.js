import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const API_KEY = "8717f091"; 

  const searchMovies = async (query) => {
    if (!query) return;

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      setMovies(res.data.Search || []);
    } catch (error) {
      console.error(error);
    }
  };

  // load watchlist from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(saved);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        background: "#111",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>🎬 Movie Web App</h1>

      <SearchBar onSearch={searchMovies} />

      {/* Search Results */}
      <h2>Search Results</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {movies.length === 0 ? (
          <p>No movies found</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>

      {/* Watchlist */}
      <h2>⭐ My Watchlist</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {watchlist.length === 0 ? (
          <p>No saved movies</p>
        ) : (
          watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
