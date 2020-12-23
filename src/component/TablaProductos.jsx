import React, { useState, useEffect } from "react";
import ModalTest from "./ModalTest";
import { Table } from "react-bootstrap";

export default function TablaProductos({ usuario }) {
  //Obtener el id del producto y almacenarlo en el estado
  const [productoId, setProductoId] = useState("");
  //Estado para manejar la paginación
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(false);
  //Estado para manejar los datos de la tabla
  const [lista, setLista] = useState({
    datos: {},
    error: null,
    loading: true,
    cantidad: 0,
  });

  useEffect(() => {
    getProductos();
  }, []);

  //Si cambia el estado de Page vuelvo a cargar los datos de los productos
  useEffect(() => {
    getProductos();
  }, [page]);

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
        error: null,
      });
    } catch (error) {
      setLista({
        datos: {},
        loading: false,
        error: error,
      });
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (lista.error !== null) {
    return <h2>Token expiró</h2>;
  }

  return (
    <>
      <ModalTest
        handleClose={handleClose}
        show={show}
        dato={productoId}
        getProductos={getProductos}
      />

      {lista.loading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h2 className="text-center">Lista de productos</h2>
          <Table striped bordered hover responsive>
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
                  <td className="text-center">
                    {usuario.role === "ADMIN_ROLE" && (
                      <div>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setProductoId(producto._id);
                            handleShow();
                          }}
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <button className="btn btn-danger ml-4">
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <button className="btn btn-info mr-2" onClick={despaginando}>
            <i className="fa fa-angle-double-left" aria-hidden="true"></i>
          </button>
          <button className="btn btn-info" onClick={paginando}>
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
          </button>
        </>
      )}
    </>
  );
}
