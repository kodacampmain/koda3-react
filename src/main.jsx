import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
// import "./styles/index.css";
// import App from "./components/App.jsx";
import DomMinitask from "./components/DomMinitask.jsx";
import Pokemon from "./components/Pokemon.jsx";
import Movies from "./components/Movies.jsx";

function Home() {
  const [page, setPage] = useState("dom");
  function changeHandler(event) {
    setPage(event.target.value);
  }
  return (
    <StrictMode>
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
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Home />);
