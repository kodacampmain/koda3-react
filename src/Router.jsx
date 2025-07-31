// import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import DomMinitask from "./pages/DomMinitask.jsx";
import Pokemon from "./pages/Pokemon.jsx";
import Movies from "./pages/Movies.jsx";
import Header from "./components/Header.jsx";
import App from "./pages/App.jsx";
import Form from "./pages/Form.jsx";
import Order from "./pages/Order.jsx";

function Router() {
  // const [page, setPage] = useState("dom");
  // function changeHandler(event) {
  //   setPage(event.target.value);
  // }
  return (
    <BrowserRouter>
      {/* <select name="page" value={page} onChange={changeHandler}>
        <option value="dom">DOM Minitask</option>
        <option value="pokemon">Pokemon</option>
        <option value="movies">Movies</option>
      </select> */}
      {/* {page === "dom" && <DomMinitask />}
      {page === "pokemon" && <Pokemon />}
      {page === "movies" && <Movies />} */}
      <Routes>
        {/* index route => di alamat / */}
        <Route index element={<Welcome />} />
        <Route element={<RouteLayout />}>
          <Route path="dom" element={<DomMinitask />} />
          <Route path="pokemon" element={<Pokemon />} />
          <Route path="movies" element={<Movies />} />
          <Route path="app" element={<App />} />
          <Route path="form" element={<Form />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
/**
 * /dom
 * /pokemon/
 * /pokemon/pokemonId
 *
 * <Routes>
 *  <Route path='dom' element-{<Dom/>} />
 *  <Route path='pokemon'>
 *    <Route index element={<Pokemon />} />
 *    <Route path='pokemonId' element={<PokemonDetail />} />
 *  </Route>
 * </Routes>
 */
function RouteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      {/* Outlet ini akan resolve menjadi route element */}
      <footer>
        <p>Ini Footer</p>
      </footer>
    </>
  );
}

function Welcome() {
  return <h1>Welcome</h1>;
}

export default Router;
