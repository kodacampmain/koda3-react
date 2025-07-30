import { useState } from "react";

import DomMinitask from "./DomMinitask.jsx";
import Pokemon from "./Pokemon.jsx";
import Movies from "./Movies.jsx";

function Home() {
  const [page, setPage] = useState("dom");
  function changeHandler(event) {
    setPage(event.target.value);
  }
  return (
    <>
      {/* <App /> */}
      <select name="page" value={page} onChange={changeHandler}>
        <option value="dom">DOM Minitask</option>
        <option value="pokemon">Pokemon</option>
        <option value="movies">Movies</option>
      </select>
      {page === "dom" && <DomMinitask />}
      {page === "pokemon" && <Pokemon />}
      {page === "movies" && <Movies />}
      {/* <DomMinitask /> */}
      {/* <Pokemon /> */}
    </>
  );
}

export default Home;
