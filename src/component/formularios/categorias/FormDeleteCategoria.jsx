import React from "react";

import { Modal, Button } from "react-bootstrap";
export default function FormDeleteCategoria(props) {
  let id = props.id;
  let token = JSON.parse(localStorage.getItem("token"));

  const deleteCategoria = async () => {
    try {
      const resp = await fetch(`http://localhost:3005/categoria/${id}`, {
        method: "delete",
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
        <Modal.Title>Eliminar Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>Está seguro que desea eliminar la categoría?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteCategoria();
          }}
        >
          Borrar
        </Button>
      </Modal.Footer>
    </>
  );
}
