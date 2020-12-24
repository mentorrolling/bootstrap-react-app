import React, { useState, useEffect } from "react";
import ModalTest from "./ModalTest";
import { Table, Form } from "react-bootstrap";

export default function TablaProductos({ usuario }) {
  //Obtener el id del producto y almacenarlo en el estado
  const [productoId, setProductoId] = useState({
    id: "",
    action: "",
  });
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

  //Obtengo los datos de los productos----------------------
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
  //-----------------------------------------------------

  //-----Buscar producto ingresado--------------------
  const buscarProducto = async ({ target }) => {
    let termino = target.value;
    let token = JSON.parse(localStorage.getItem("token"));
    if (termino !== "") {
      try {
        const resp = await fetch(
          `http://localhost:3005/producto/buscar/${termino}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              token: `${token}`,
            },
          }
        );
        const data = await resp.json();

        setLista({
          ...lista,
          datos: data.producto,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      getProductos();
    }
  };
  //------------------------------------------

  //----Limpiar campo de busqueda-------------

  const limpiarBuscador = ({ target }) => {
    target.value = "";
    getProductos();
  };
  //------------------------------------------

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

          {/* Sección de buscar producto */}
          <div className="col-12 col-md-6 offset-md-3 col-lg-8 offset-lg-2">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Buscar producto..."
                name="buscar"
                onChange={buscarProducto}
                onClick={limpiarBuscador}
              />
            </Form.Group>
          </div>
          {/* --------------------------- */}
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoria</th>
                <th>
                  {usuario.role === "ADMIN_ROLE" && (
                    <button
                      className="btn btn-info btn-block mr-md-4 mb-2 mb-md-0"
                      onClick={() => {
                        setProductoId({
                          id: "",
                          action: "nuevo",
                        });
                        handleShow();
                      }}
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i> Agregar
                    </button>
                  )}
                </th>
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
                      <div className="col">
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setProductoId({
                              id: producto._id,
                              action: "actualizar",
                            });
                            handleShow();
                          }}
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <button
                          className="btn btn-danger ml-md-4 mt-2 mt-md-0"
                          onClick={() => {
                            setProductoId({
                              id: producto._id,
                              action: "borrar",
                            });
                            handleShow();
                          }}
                        >
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
