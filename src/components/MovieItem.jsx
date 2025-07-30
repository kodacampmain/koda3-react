/**
 * Komponen Satuan dari Movie
 * @param {Object} props
 * @param {Object} props.movie - Object Movie
 * @param {number} props.movie.id - Id dari Movie
 * @param {string} props.movie.title - Judul dari Movie
 * @param {string} props.movie.poster_path - File image dari Movie
 * @param {string[]} props.movie.genres - Genre-genre dari Movie
 */
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
