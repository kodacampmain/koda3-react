import { useEffect, useState } from "react";
import { useParams } from "react-router";

function MovieDetail() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  //   console.log(movieId);
  useEffect(() => {
    (async function () {
      const url = `${import.meta.env.VITE_API_URL}/movie/${movieId}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_READ}`,
        },
      };
      try {
        setIsLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) throw response.statusText;
        const data = await response.json();
        // console.log(data);
        setMovie(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && Object.keys(movie).length > 0 && (
        <>
          <h1>{movie.title}</h1>
          <div>
            <img
              src={`${import.meta.env.VITE_PREFIX_IMAGE}${movie.poster_path}`}
              alt={movie.title}
              width={100}
              height={200}
            />
          </div>
          <div>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </>
  );
}

export default MovieDetail;
