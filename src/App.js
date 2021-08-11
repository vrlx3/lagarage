import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { Footer } from "./components/Footer";
import { checkLogin } from "./utils";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const setLogIn = async () => {
      let data = await checkLogin();
      if (data.id) {
        setUser(data);
      }
    };
    setLogIn();
  }, []);
  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes user={user} setUser={setUser} />
      <Footer />
    </div>
  );
}

export default App;
