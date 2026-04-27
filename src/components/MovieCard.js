function MovieCard({ movie }) {

  const addToWatchlist = () => {
    let list = JSON.parse(localStorage.getItem("watchlist")) || [];

    // avoid duplicates
    if (!list.find((m) => m.imdbID === movie.imdbID)) {
      list.push(movie);
      localStorage.setItem("watchlist", JSON.stringify(list));
      alert("Added to Watchlist");
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : ""}
        alt={movie.Title}
        width="150"
      />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>

      <button onClick={addToWatchlist}>
        ⭐ Add to Watchlist
      </button>
    </div>
  );
}

export default MovieCard;
