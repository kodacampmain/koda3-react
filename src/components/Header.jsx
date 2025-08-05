import { useContext } from "react";

import { ThemeContext } from "../contexts/theme/themeContext.js";
import logo from "../assets/48.png";
import ListItem from "./ListItem.jsx";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navBtn = [
    { text: "DOM", route: "/content" },
    { text: "Pokemon", route: "/content/pokemon" },
    { text: "Movies", route: "/movies" },
  ];
  const setCount = () =>
    this.setState((state) => {
      return { ...state, count: state.count + 1 };
    });
  return (
    <header
      className={`border-b-solid flex border-b-2 px-1.25 py-5 font-[cursive] ${theme === "light" ? "border-b-black bg-white text-black" : "border-b-white bg-black text-white"}`}
    >
      <img src={logo} alt="logo" className="h-7.5 w-7.5" />
      <nav className="mx-auto flex items-center">
        <ul className="flex list-none gap-2.5">
          {navBtn.map((nav, idx) => {
            // return <li key={idx}>{nav}</li>
            return <ListItem listText={nav.text} to={nav.route} key={idx} />;
          })}
        </ul>
      </nav>
      <div
        className={`mx-1.25 cursor-pointer p-1.25 ${theme === "dark" && "bg-white"} rounded-full`}
        onClick={toggleTheme}
      >
        {theme === "light" && (
          <img
            src="/moon-solid-full.svg"
            alt="moon-icon"
            width={24}
            height={24}
          />
        )}
        {theme === "dark" && (
          <img src="/sun.svg" alt="sun-icon" width={24} height={24} />
        )}
      </div>
      <div className="logged-in">
        <button>Sign Out</button>
      </div>
      <div className="logged-out">
        <button onClick={setCount}>Sign in</button>
      </div>
      <div className="ml-2.5 hidden w-7.5 cursor-pointer flex-col content-around">
        <div className="border-b-solid rounded-[2px] border-b-4 border-b-black"></div>
        <div className="border-b-solid rounded-[2px] border-b-4 border-b-black"></div>
        <div className="border-b-solid rounded-[2px] border-b-4 border-b-black"></div>
      </div>
    </header>
  );
}

export default Header;
