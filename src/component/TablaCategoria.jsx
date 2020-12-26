import React, { useEffect, useState } from "react";
import { getCategoria } from "../helpers/Categorias";

import { Table } from "react-bootstrap";
import ModalCategoria from "./modales/ModalCategoria";

export default function TablaCategoria(props) {
  const [categorias, setCategorias] = useState([]);
  const [show, setShow] = useState(false);

  const [modalType, setModalType] = useState({
    tipo: "",
    id: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    actualizaCategoria();
  }, []);

  const actualizaCategoria = () => {
    getCategoria()
      .then((response) => setCategorias(response))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ModalCategoria
        show={show}
        handleClose={handleClose}
        modalType={modalType}
        actualizaCategoria={actualizaCategoria}
      />
      <h2 className="text-center">Lista de Categorias</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Usuario</th>

            <th>
              {props.usuario.role === "ADMIN_ROLE" && (
                <button
                  className="btn btn-info btn-block"
                  onClick={() => {
                    setModalType({
                      ...modalType,
                      tipo: "add",
                    });
                    handleShow();
                  }}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  <span className="d-none d-md-inline"> Agregar</span>
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria._id}>
              <td>{categoria.descripcion}</td>
              <td>{categoria.usuario.email}</td>

              <td>
                {props.usuario.role === "ADMIN_ROLE" && (
                  <div className="col">
                    <button
                      className="btn btn-danger ml-md-4 mt-2 mt-md-0"
                      onClick={() => {
                        setModalType({
                          tipo: "delete",
                          id: categoria._id,
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
    </>
  );
}
