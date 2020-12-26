import React, { useState } from "react";

import { Modal, Button } from "react-bootstrap";
export default function FormAddCategoria(props) {
  //   let token = JSON.stringify(localStorage.getItem("token"));
  let id = JSON.stringify(localStorage.getItem("id"));
  const [state, setState] = useState({
    descripcion: "",
    usuario: "",
  });

  const handleChange = ({ target }) => {
    setState({
      descripcion: target.value,
      usuario: id,
    });
  };

  const addCategoria = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch("http://localhost:3005/categoria", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      });
      props.actualizaCategoria();
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Categorias</Modal.Title>
      </Modal.Header>
      <form onSubmit={addCategoria}>
        <Modal.Body>
          <div className="container">
            <div className="col">
              <div className="form-group">
                <label>Nombre de la nueva categoría</label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  value={state.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Cancelar
          </Button>
          <Button variant="info" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </form>
    </>
  );
}
