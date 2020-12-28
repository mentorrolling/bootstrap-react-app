import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Tabla from "./component/Tabla";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Registro from "./pages/Registro";

function App() {
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  return (
    <>
      {/* <NavBarTest /> */}

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/tabla" component={Tabla} />
          <Route exact path="/registro" component={Registro} />
          <Route component={Error404} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
