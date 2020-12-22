import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import Tabla from "./component/Tabla";
import Login from "./pages/Login";

function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <>
      {/* <NavBarTest /> */}

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/tabla" component={Tabla} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
