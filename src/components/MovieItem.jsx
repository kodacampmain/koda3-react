function MovieItem(props) {
  const { movie } = props;
  return (
    <div key={movie.id}>
      <h3>{movie.title}</h3>
      <img src={`${import.meta.env.VITE_PREFIX_IMAGE}${movie.poster_path}`} alt="poster" width={50} height={100} />
      <div style={{ display: "flex", gap: "5px" }}>
        {movie.genres.map((genre, idx) => {
          return <p key={idx}>{genre}</p>;
        })}
      </div>
    </div>
  );
}
export default MovieItem;
