import React, { useState, useEffect } from "react";
import { getCategoria } from "../helpers/Categorias";

import { Form, Button, InputGroup } from "react-bootstrap";
export default function FormUpdateProd(props) {
  const [actualizado, setActualizado] = useState({
    nombre: "",
    disponible: true,
    precio: 0,
    descripcion: "",
    usuario: {},
    categoria: {},
  });
  const [cat, setCat] = useState([]);

  const handleChange = ({ target }) => {
    setActualizado({
      ...actualizado,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    getProducto();
    getCategoria()
      .then((response) => setCat(response))
      .catch((error) => console.log(error));
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
        body: JSON.stringify(actualizado),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      });
      const data = await resp.json();
      console.log(data.message);

      props.actualizaLista(props.page);
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
      <Form.Label>Categoría</Form.Label>
      <Form.Control
        as="select"
        name="categoria"
        onChange={handleChange}
        placeholder="Elige la categoría"
      >
        <option>
          {actualizado.categoria === null
            ? "Sin categoría"
            : actualizado.categoria.descripcion}
        </option>
        {cat.map((categoria) => (
          <option key={categoria._id} value={categoria._id}>
            {categoria.descripcion}
          </option>
        ))}
      </Form.Control>
      <Form.Group></Form.Group>
      <Form.Group>
        <Form.Label>Precio</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="precioUni"
            type="text"
            value={actualizado.precioUni}
            onChange={handleChange}
          />
        </InputGroup>
      </Form.Group>

      <div className="form-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="disponible"
            value={actualizado.disponible}
            onChange={() => {
              if (actualizado.disponible) {
                setActualizado({
                  ...actualizado,
                  disponible: false,
                });
              } else {
                setActualizado({
                  ...actualizado,
                  disponible: true,
                });
              }
            }}
            checked={actualizado.disponible}
          />
          <label className="form-check-label">Disponible</label>
        </div>

        {/* <Form.Label>Estado</Form.Label>
        <Form.Control as="select" name="disponible" onChange={handleChange}>
          <option value={actualizado.disponible}>
            {actualizado.disponible ? "Disponible" : "No disponible"}
          </option>

          <option>{!setActualizado.form.disponible ? 'No disponible' : 'Disponible'}</option>
        </Form.Control> */}
      </div>
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
