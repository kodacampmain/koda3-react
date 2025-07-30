import { useEffect, useState } from "react";

import MovieItem from "../components/MovieItem";
// import Header from "../components/Header";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(new Map());
  const [error, setError] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_READ}`,
          },
        };
        const urlMovies = `${import.meta.env.VITE_API_URL}/movie/now_playing?language=en-US&page=1`;
        const urlGenre = `${import.meta.env.VITE_API_URL}/genre/movie/list?language=en`;
        const promises = [fetch(urlMovies, options), fetch(urlGenre, options)];
        const [movieResponse, genreResponse] = await Promise.all(promises);
        // mengubah hasil genre menjadi HashMap untuk memudahkan pencarian
        const movieResult = await movieResponse.json();
        const genreResult = await genreResponse.json();
        const genreMap = new Map();
        // console.log(genreResult);
        genreResult.genres.forEach((genre) => {
          genreMap.set(genre.id, genre.name);
        });
        // ambil data movies yang dibutuhkan saja
        const movies = movieResult.results.map((movie) => {
          const { title, backdrop_path, poster_path, release_date, genre_ids, id } = movie;
          const result = {
            id,
            title,
            backdrop_path,
            poster_path,
            release_date,
          };
          // ubah data genre_id menjadi genre name nya berdasarkan HashMap yang sudah dibuat
          const genres = genre_ids.map((id) => {
            return genreMap.get(id);
          });
          Object.assign(result, { genres });
          return result;
        });
        // console.log(movies);
        setMovies(movies);
        setGenres(genreMap);
      } catch (err) {
        console.log(err);
        setError(new Error(err.message));
      }
    })();
  }, []);
  return (
    <>
      {/* <Header /> */}
      <h1>Movies</h1>
      <section style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {genres.size > 0 &&
          (function () {
            const result = [];
            for (let genreId of genres.keys()) {
              result.push(<p key={genreId}>{genres.get(genreId)}</p>);
            }
            return result;
          })()}
      </section>
      <div>
        {movies.length === 0 ? <p>Loading...</p> : <></>}
        {error !== null && <p>{error.message}</p>}
        {error === null &&
          movies.length > 0 &&
          movies.map((movie) => {
            console.log(movie);
            return <MovieItem movie={movie}  />;
          })}
      </div>
    </>
  );
}

export default Movies;
