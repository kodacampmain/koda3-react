// import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import DomMinitask from "./pages/DomMinitask.jsx";
import Pokemon from "./pages/Pokemon.jsx";
import Movies from "./pages/Movies.jsx";
import Header from "./components/Header.jsx";
import App from "./pages/App.jsx";
import Form from "./pages/Form.jsx";
import Order from "./pages/Order.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import { PrivateRoute, PrivateElement } from "./components/PrivateRoute.jsx";

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
            <Route
              index
              element={
                <PrivateRoute redirectTo="/content/app">
                  <Movies />
                </PrivateRoute>
              }
            />
            <Route
              path="order"
              element={
                <PrivateElement redirectTo="/content/app">
                  <Order />
                </PrivateElement>
              }
            />
            <Route path=":movieId" element={<MovieDetail />} />
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
      <div className="outlet-grid grid">
        <div></div>
        <div>
          <Outlet />
        </div>
        <div></div>
      </div>
      {/* Outlet ini akan resolve menjadi route element */}
      <footer>
        <p>Ini Footer</p>
      </footer>
    </>
  );
}

function Welcome() {
  return (
    <>
      <h1 className="font-mysoul bg-primary m-1/10 p-2 text-(size:--my-custom-variable) [border:2px_solid_black] hover:[color:blue]">
        Welcome
      </h1>
      <h1>Hello</h1>
      <div data-theme="midnight">
        <button className="btn md:hover:float">Tombol</button>
      </div>
      <section>
        <div data-theme="midnight">
          <p className="theme-midnight:bg-black theme-midnight:text-white">
            Hello
          </p>
        </div>
        <div>
          <p className="theme-midnight:bg-black">World</p>
        </div>
      </section>
    </>
  );
}

export default Router;
