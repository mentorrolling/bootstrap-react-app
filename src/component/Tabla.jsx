import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import NavBarTest from "./NavBarTest";
import Portada from "../images/portada.svg";

export default function Tabla(props) {
  //verifico si hay un token guardado en el LocalStorage
  const token = localStorage.getItem("token") || "";

  const [logout, setLogout] = useState(false); //Estado que verifica el deslogueo

  //Estado para manejar los datos de la tabla
  const [lista, setLista] = useState({
    datos: {},
    loading: true,
    cantidad: 0,
  });

  //Estado para obtener datos del usuario logueado
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    role: "",
  });

  //Estado para manejar la paginación
  const [page, setPage] = useState(0);

  useEffect(() => {
    //al montar componente
    //si no hay token volvemos al login
    const inicio = () => {
      if (token === "") {
        props.history.push("/");
      } else {
        //traemos datos del usuario y de productos
        getUsuario();
        getProductos();
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

  //Si cambia el estado de Page vuelvo a cargar los datos de los productos
  useEffect(() => {
    getProductos();
  }, [page]);

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

  //Obtengo los datos de los productos
  const getProductos = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      // envío los parámetros para la paginacion y defino el desde con el valor
      // del estado page
      const resp = await fetch(
        `http://localhost:3005/producto?limite=5&desde=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            token: `${token}`,
          },
        }
      );
      const data = await resp.json();

      //Almaceno en el estado lista los datos obtenidos
      setLista({
        datos: data.productos,
        loading: false,
        cantidad: data.cantidad,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // funcion para manejar paginado next
  const paginando = () => {
    if (page < lista.cantidad - 5) {
      setPage(page + 5);
    }
  };

  // Función para manejar paginado previo
  const despaginando = () => {
    if (page >= 5) {
      setPage(page - 5);
    }
  };
  return (
    <>
      {token.length > 0 && (
        <div>
          <NavBarTest setLogout={setLogout} />
          <div className="container mt-4">
            <div className="row">
              <div className="col">
                <img src={Portada} alt="portada" />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <h2 className="text-center">Lista de productos</h2>

                {lista.loading ? (
                  <h1>Loading...</h1>
                ) : (
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {lista.datos.map((producto, _id) => (
                        <tr key={_id}>
                          <td>{producto.nombre}</td>
                          <td className="text-right">$ {producto.precioUni}</td>
                          <td>{producto.categoria.descripcion}</td>
                          <td>
                            {usuario.role === "ADMIN_ROLE" && (
                              <button className="btn btn-warning">
                                Modificar
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
                <button className="btn btn-info mr-2" onClick={despaginando}>
                  ⏪
                </button>
                <button className="btn btn-info" onClick={paginando}>
                  ⏩
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
