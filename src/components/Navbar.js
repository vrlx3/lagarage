import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
import { green } from "@material-ui/core/colors";
import { retry } from "async";
import Slide from "@material-ui/core/Slide";

function Navbar(props) {
  const { user, setUser, history } = props;
  const [showMenu, setShowMenu] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser({});
    history.push("/");
  }

  function menuClick(event) {
    event.preventDefault;

    setShowMenu(!showMenu);
  }
  function sendLogin(event) {
    event.preventDefault();
    history.push("/login");
    setShowMenu(false);
  }

  function sendRegister(event) {
    event.preventDefault();
    history.push("/register");
    setShowMenu(false);
  }
  function MenuOpen() {
    return (
      <div id="menuOpen">
        {Boolean(user.id) == true ? (
          <></>
        ) : (
          <div onClick={sendLogin}>Login</div>
        )}

        <div onClick={sendRegister}>Register</div>
        <div>Menu Option3</div>

        {Boolean(user.id) == true ? (
          <div onClick={handleLogout}>Logout</div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  function sendHome(event) {
    event.preventDefault();
    props.history.push("/"); // send it home
    setShowMenu(false);
  }

  return (
    <div>
      <h1 onClick={sendHome}>La Garage</h1>
      {showMenu === true ? (
        <div id="showMenu">
          <Slide direction="right" in={showMenu}>
            <MenuOpenRoundedIcon
              fontSize="large"
              onClick={(event) => menuClick(event)}
            />
          </Slide>
        </div>
      ) : (
        <Slide direction="right" in={!showMenu}>
          <MenuRoundedIcon
            fontSize="large"
            onClick={(event) => menuClick(event)}
          />
        </Slide>
      )}

      {showMenu === true ? <MenuOpen /> : <></>}

      {/* <nav>
        {user.id ? (
          <div>
            <NavLink to="/Home">Home</NavLink>
            {
              <a href="#" onClick={handleLogout}>
                Log Out
              </a>
            }
          </div>
        ) : (
          <div>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </div>
        )}
      </nav> */}
    </div>
  );
}

export default withRouter(Navbar);
