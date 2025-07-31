import logo from "../assets/48.png";
import ListItem from "./ListItem.jsx";

function Header() {
  const navBtn = [
    { text: "DOM", route: "/dom" },
    { text: "Pokemon", route: "/pokemon" },
    { text: "Movies", route: "/movies" },
  ];
  const setCount = () =>
    this.setState((state) => {
      return { ...state, count: state.count + 1 };
    });
  return (
    <header className="font-[cursive] flex px-1.25 py-5">
      <img src={logo} alt="logo" className="w-7.5 h-7.5" />
      <nav className="mx-auto flex items-center">
        <ul className="flex list-none gap-2.5">
          {navBtn.map((nav, idx) => {
            // return <li key={idx}>{nav}</li>
            return <ListItem listText={nav.text} to={nav.route} key={idx} />;
          })}
        </ul>
      </nav>
      <div className="logged-in">
        <button>Sign Out</button>
      </div>
      <div className="logged-out">
        <button onClick={setCount}>Sign in</button>
      </div>
      <div className="w-7.5 ml-2.5 flex-col content-around cursor-pointer hidden">
        <div className="border-b-4 border-b-solid border-b-black rounded-[2px]"></div>
        <div className="border-b-4 border-b-solid border-b-black rounded-[2px]"></div>
        <div className="border-b-4 border-b-solid border-b-black rounded-[2px]"></div>
      </div>
    </header>
  );
}

export default Header;
