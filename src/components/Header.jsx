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
    <header>
      <img src={logo} alt="logo" />
      <nav>
        <ul>
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
      <div className="hamburger-menu">
        <div className="top"></div>
        <div className="middle"></div>
        <div className="bottom"></div>
      </div>
    </header>
  );
}

export default Header;
