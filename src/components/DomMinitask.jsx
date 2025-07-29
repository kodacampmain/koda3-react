import { Component, Fragment } from "react";
import logo from "../assets/48.png";

function ListItem(props) {
  return <li>{props.listText}</li>;
}

class DomMinitask extends Component {
  state = {
    count: 0,
  };
  componentDidMount() {
    console.log("finished Mounting");
  }
  componentDidUpdate(prevProps, prevState) {
    /**
     * prevProps => props sebelum updating
     * this.props => props setelah updating
     * prevState => state sebelum updating
     * this.state => state setelah updating
     */
    console.log("Finished Updating");
    console.log(`before: ${prevState.count}, after: ${this.state.count}`);
  }
  componentWillUnmount() {
    // alert("unmounting");
  }
  render() {
    const navBtn = ["Home", "Products", "About"];
    const setCount = () =>
      this.setState((state) => {
        return { ...state, count: state.count + 1 };
      });
    return (
      <Fragment>
        <header>
          <img src={logo} alt="logo" />
          <nav>
            <ul>
              {navBtn.map((nav, idx) => {
                // return <li key={idx}>{nav}</li>
                return <ListItem listText={nav} key={idx} />;
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

        <section className="login">
          <form>
            <input type="text" name="email" placeholder="Email" autoComplete="off" />
            <input type="password" name="pwd" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </section>

        <section className="traffic-light">
          <div className="container">
            <div className="light red active"></div>
            <div className="light yellow"></div>
            <div className="light green"></div>
          </div>
        </section>
        <section className="chess-board"></section>
        <section className="profile"></section>
        <section className="score-table">
          <table id="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alice</td>
                <td>95</td>
              </tr>
              <tr>
                <td>Bob</td>
                <td>87</td>
              </tr>
            </tbody>
          </table>
        </section>
      </Fragment>
    );
  }
}

export default DomMinitask;
