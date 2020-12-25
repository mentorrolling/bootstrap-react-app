import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../images/logo.png";
import Portada from "../images/login.svg";

import "../css/login.css";

import FormRegistro from "../component/FormRegistro";
export default function Login(props) {
  //Asigno a esta variable lo que haya en el localstorage por si quedó logueado.
  const token = localStorage.getItem("token") || "";
  //--------------------------------------------------------------------------
  const [ingreso, setIngreso] = useState({
    token: "",
    id: "",
  });

  useEffect(() => {
    if (ingreso.token.length > 0) {
      localStorage.setItem("id", JSON.stringify(ingreso.id));
      props.history.push("/tabla");
    }
  }, [ingreso]);

  return (
    <>
      <nav
        id="navLogin"
        className="navbar navbar-dark bg-dark d-flex justify-content-center"
      >
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="" />
        </a>
      </nav>
      <div id="contenedor" className="container mt-4">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6 mb-3">
            <img src={Portada} alt="portada" />
          </div>
          <div id="formulario" className="col-12 col-md-12 col-lg-6 mb-3 ">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Ingreso</h5>
                {token.length > 0 ? (
                  <div>
                    <h3 className="text-center">Ya se encuentra logueado</h3>
                    <Link to="/tabla">Seguir</Link>
                  </div>
                ) : (
                  <FormRegistro setIngreso={setIngreso} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
