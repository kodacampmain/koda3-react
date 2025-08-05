import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import MovieItem from "../components/MovieItem";
// import Header from "../components/Header";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(new Map());
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  useEffect(() => {
    console.log(searchParams.toString());
    // asumsikan yg berubah hanya page saja
    (async function () {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_READ}`,
          },
        };
        const urlMovies = `${import.meta.env.VITE_API_URL}/movie/now_playing?${searchParams.toString()}&language=en-US`;
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
          const {
            title,
            backdrop_path,
            poster_path,
            release_date,
            genre_ids,
            id,
          } = movie;
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
  }, [searchParams]);
  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const options = {
  //         method: "GET",
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${import.meta.env.VITE_API_READ}`,
  //         },
  //       };
  //       const urlMovies = `${import.meta.env.VITE_API_URL}/movie/now_playing?language=en-US&page=1`;
  //       const urlGenre = `${import.meta.env.VITE_API_URL}/genre/movie/list?language=en`;
  //       const promises = [fetch(urlMovies, options), fetch(urlGenre, options)];
  //       const [movieResponse, genreResponse] = await Promise.all(promises);
  //       // mengubah hasil genre menjadi HashMap untuk memudahkan pencarian
  //       const movieResult = await movieResponse.json();
  //       const genreResult = await genreResponse.json();
  //       const genreMap = new Map();
  //       // console.log(genreResult);
  //       genreResult.genres.forEach((genre) => {
  //         genreMap.set(genre.id, genre.name);
  //       });
  //       // ambil data movies yang dibutuhkan saja
  //       const movies = movieResult.results.map((movie) => {
  //         const {
  //           title,
  //           backdrop_path,
  //           poster_path,
  //           release_date,
  //           genre_ids,
  //           id,
  //         } = movie;
  //         const result = {
  //           id,
  //           title,
  //           backdrop_path,
  //           poster_path,
  //           release_date,
  //         };
  //         // ubah data genre_id menjadi genre name nya berdasarkan HashMap yang sudah dibuat
  //         const genres = genre_ids.map((id) => {
  //           return genreMap.get(id);
  //         });
  //         Object.assign(result, { genres });
  //         return result;
  //       });
  //       // console.log(movies);
  //       setMovies(movies);
  //       setGenres(genreMap);
  //     } catch (err) {
  //       console.log(err);
  //       setError(new Error(err.message));
  //     }
  //   })();
  // }, []);
  const onClickGenre = (genreId) => {
    setSearchParams((searchParams) => {
      const sp = URLSearchParamsToObject(searchParams);
      // proses penambahan genre
      // jika genre nya belum ada
      const newGenre = genres.get(genreId).toLowerCase();
      if (!Object.keys(sp).includes("genre")) {
        Object.assign(sp, {
          genre: newGenre,
        });
        return sp;
      }
      // jika genre nya berbentuk non-array
      if (!Array.isArray(sp.genre)) {
        if (sp.genre === newGenre) {
          delete sp.genre;
          // console.log(sp);
          return sp;
        }
        Object.assign(sp, {
          genre: [sp.genre, newGenre],
        });
        return sp;
      }
      // jika genre berbentuk array
      if (sp.genre.includes(newGenre)) {
        Object.assign(sp, {
          genre: sp.genre.filter((genre) => genre !== newGenre),
        });
        return sp;
      }
      Object.assign(sp, {
        genre: [...sp.genre, newGenre],
      });
      return sp;

      // console.log(sp);
      // if (
      //   searchParams.getAll("genre").includes(genres.get(genreId).toLowerCase())
      // ) {
      //   return {
      //     ...searchParams,
      //     genre: searchParams
      //       .getAll("genre")
      //       .filter((genre) => genre !== genres.get(genreId).toLowerCase()),
      //   };
      // }
      // return {
      //   ...searchParams,
      //   genre: [
      //     ...searchParams.getAll("genre"),
      //     genres.get(genreId).toLowerCase(),
      //   ],
      // };
    });
  };
  return (
    <>
      {/* <Header /> */}
      <h1>Movies</h1>
      <section className="flex flex-wrap gap-1.25">
        {genres.size > 0 &&
          (function () {
            const result = [];
            for (let genreId of genres.keys()) {
              // console.log(genres.get(genreId));
              result.push(
                <p
                  key={genreId}
                  onClick={() => onClickGenre(genreId)}
                  className={`${searchParams.getAll("genre").includes(genres.get(genreId).toLowerCase()) ? "bg-gray-700 text-white" : "bg-white text-black"} cursor-pointer`}
                >
                  {genres.get(genreId)}
                </p>,
              );
            }
            return result;
          })()}
      </section>
      <section className="flex justify-evenly gap-2">
        {[1, 2, 3].map((pageNumber, idx) => {
          return (
            <div
              key={idx}
              className="cursor-pointer w-25 bg-amber-200 rounded-sm"
              onClick={() => {
                // logika paginasi
                setSearchParams((searchParams) => {
                  if (searchParams.has("page")) {
                    searchParams.set("page", pageNumber);
                  } else {
                    searchParams.append("page", pageNumber);
                  }
                  return searchParams;
                });
              }}
            >
              {pageNumber}
            </div>
          );
        })}
      </section>
      <div>
        {movies.length === 0 ? <p>Loading...</p> : <></>}
        {error !== null && <p>{error.message}</p>}
        {error === null &&
          movies.length > 0 &&
          movies.map((movie) => {
            // console.log(movie);
            return <MovieItem movie={movie} key={movie.id} />;
          })}
      </div>
    </>
  );
}

/**
 *
 * @param {URLSearchParams} searchParams
 * @returns
 */
function URLSearchParamsToObject(searchParams) {
  const sp = {};
  searchParams.forEach((value, key) => {
    if (Object.keys(sp).includes(key)) {
      // jika sp[key] berbentuk array, maka lakukan spread
      if (Array.isArray(sp[key])) {
        Object.assign(sp, {
          [key]: [...sp[key], value],
        });
        return;
      }
      // jika sp[key] bukan array, maka masukkan ke dalam array baru
      Object.assign(sp, {
        [key]: [sp[key], value],
      });
      return;
    }
    // jika belum ada nilai sp[key], maka buatkan data baru dengan key dan value nya
    Object.assign(sp, {
      [key]: value,
    });
  });
  return sp;
}

export default Movies;
