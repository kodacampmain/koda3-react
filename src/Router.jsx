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
        {/** / => Welcome
         * /register => form
         * /content => dom minitask + RouteLayout
         * /content/pokemon => pokemon + RouteLayout
         * /content/app => App + RouteLayout
         * /movies => movies + RouteLayout
         * /movies/order => order + RouteLayout */}
        <Route path="">
          <Route index element={<Welcome />} />
          <Route path="register" element={<Form />} />
          <Route path="content" element={<RouteLayout />}>
            <Route index element={<DomMinitask />} />
            <Route path="pokemon" element={<Pokemon />} />
            <Route path="app" element={<App />} />
          </Route>
          <Route path="movies" element={<RouteLayout />}>
            <Route index element={<Movies />} />
            <Route path="order" element={<Order />} />
          </Route>
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
