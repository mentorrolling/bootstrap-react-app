import React, { useEffect, useState } from "react";
import { getCategoria } from "../helpers/Categorias";

import { Table } from "react-bootstrap";

export default function TablaCategoria(props) {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategoria()
      .then((response) => setCategorias(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2 className="text-center">Lista de Categorias</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Usuario</th>

            <th>
              {props.usuario.role === "ADMIN_ROLE" && (
                <button className="btn btn-info btn-block">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr>
              <td>{categoria.descripcion}</td>
              <td>{categoria.usuario.email}</td>

              <td>
                {props.usuario.role === "ADMIN_ROLE" && (
                  <div className="col">
                    <button className="btn btn-warning">
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button className="btn btn-danger ml-md-4 mt-2 mt-md-0">
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
