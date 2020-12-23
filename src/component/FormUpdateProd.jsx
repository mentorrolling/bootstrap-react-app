import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
export default function FormUpdateProd(props) {
  const [actualizado, setActualizado] = useState({
    form: {
      nombre: "",
      precio: "",
      descripcion: "",
    },
  });

  const handleChange = ({ target }) => {
    setActualizado({
      form: {
        ...actualizado.form,
        [target.name]: target.value,
      },
    });
  };

  useEffect(() => {
    getProducto();
  }, []);

  const getProducto = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3005/producto/${props.dato}`, {
        method: "GET",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      });
      const data = await resp.json();

      setActualizado(data.producto);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem("token"));
    try {
      const resp = await fetch(`http://localhost:3005/producto/${props.dato}`, {
        method: "PUT",
        body: JSON.stringify(actualizado.form),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      });
      const data = await resp.json();
      console.log(data.message);
      props.getProductos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          name="nombre"
          type="text"
          value={actualizado.nombre}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Precio</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="precio"
            type="text"
            value={actualizado.precioUni}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          name="descripcion"
          type="text"
          value={actualizado.descripcion}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" onClick={props.handleClose}>
          <i className="fa fa-refresh" aria-hidden="true"></i> Actualizar
        </Button>
      </div>
    </Form>
  );
}
