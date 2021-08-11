import React, { useState } from "react";
import axios from "axios";
import { login, register } from "../utils";

function AuthForm(props) {
  let { type, setUser } = props; // type of auth form (login or signup) and isLoggedIn Function
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (!username || !password) {
      return; // need to fill out username and password
    } else {
      try {
        let data =
          type === "login"
            ? await login(username, password)
            : await register(username, password);
        if (data.user) {
          await setUsername("");
          await setPassword("");
          await setUser(data.user);
          props.history.push("/home"); // send it home
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <form className="AuthForm" onSubmit={handleSubmit}>
      <div>
        <input
          id="username"
          value={username}
          type="text"
          placeholder="Enter Username Eg. John_garage"
          onChange={(evt) => setUsername(evt.target.value)}
        />
      </div>
      <div>
        <input
          id="password"
          value={password}
          type="text"
          placeholder="Password"
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <button type="submit">{type === "login" ? "Login" : "Register"}</button>
    </form>
  );
}

export default AuthForm;
