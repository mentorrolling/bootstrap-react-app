import React, { useEffect, useState } from "react";

import NavBarTest from "./NavBarTest";

import "../css/tabla.css";
import Portada from "../images/portada.svg";

import TablaProductos from "./TablaProductos";

export default function Tabla(props) {
  //verifico si hay un token guardado en el LocalStorage
  const token = localStorage.getItem("token") || "";
  const [logout, setLogout] = useState(false); //Estado que verifica el deslogueo

  //Estado para obtener datos del usuario logueado
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    //al montar componente
    //si no hay token volvemos al login
    const inicio = () => {
      if (token === "") {
        props.history.push("/");
      } else {
        //traemos datos del usuario
        getUsuario();
      }
    };
    inicio();
  }, []);

  //Si cambia el estado logout y es true volvemos a login
  useEffect(() => {
    if (logout) {
      props.history.push("/");
    }
  }, [logout]);

  //Ejecuto método para traer datos del usuario
  const getUsuario = async () => {
    //obtengo los datos del token, id del localStorage
    // para enviarlos como parámetros
    let token = JSON.parse(localStorage.getItem("token"));
    let id = JSON.parse(localStorage.getItem("id"));
    try {
      const resp = await fetch(`http://localhost:3005/usuario/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      });
      const data = await resp.json();

      //Almaceno en el estado usuario los datos obtenidos
      setUsuario({
        nombre: data.usuario.nombre,
        email: data.usuario.email,
        role: data.usuario.role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {token.length > 0 && (
        <div>
          <NavBarTest setLogout={setLogout} />

          <div className="container mt-4">
            <div id="portada" className="row">
              <div className="col">
                <img src={Portada} alt="portada" />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <TablaProductos usuario={usuario} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
