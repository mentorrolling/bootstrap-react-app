import React, { useEffect, useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";

export default function FormAddProducto(props) {
  let token = JSON.parse(localStorage.getItem("token"));

  const [state, setState] = useState({
    form: {
      nombre: "",
      precioUni: "",
      descripcion: "",
      categoria: "",
    },
  });

  const [estado, setEstados] = useState({
    loading: false,
    error: null,
  });
  const [cat, setCat] = useState([]);

  useEffect(() => {
    getCategoria();
  }, []);

  const handleChange = ({ target }) => {
    setState({
      form: {
        ...state.form,
        [target.name]: target.value,
      },
    });
  };

  const getCategoria = async () => {
    try {
      const resp = await fetch("http://localhost:3005/categoria", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      });
      const data = await resp.json();
      console.log(data.categorias);
      setCat(data.categorias);
    } catch (error) {
      console.log(error);
    }
  };

  const postProducto = async (e) => {
    e.preventDefault();
    setEstados({
      loading: true,
      error: null,
    });
    try {
      const resp = await fetch(`http://localhost:3005/producto`, {
        method: "POST",
        body: JSON.stringify(state.form),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      });
      const data = await resp.json();
      console.log(data);
      setEstados({
        loading: false,
        error: null,
      });
      if (data.ok) {
        props.actualizaLista(props.page);
        props.handleClose();
      } else {
        setEstados({
          loading: false,
          error: data.ok,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={postProducto}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del producto"
              value={state.form.nombre}
              name="nombre"
              onChange={handleChange}
              required
              disabled={estado.loading ? true : false}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Breve descripción del producto"
              value={state.form.descripcion}
              name="descripcion"
              onChange={handleChange}
              disabled={estado.loading ? true : false}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="categoria"
              onChange={handleChange}
              placeholder="Elige la categoría"
              required
              disabled={estado.loading ? true : false}
            >
              <option>Elige la categoría</option>
              {cat.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.descripcion}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <div className="col-6 offset-6 ">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={state.form.precioUni}
                name="precioUni"
                onChange={handleChange}
                required
                disabled={estado.loading ? true : false}
              />
            </div>
          </Form.Group>
          {estado.error === false && (
            <div>
              <Alert variant="danger" className="text-center">
                Verificar los datos
              </Alert>
            </div>
          )}
          <hr />
          <div className="col-6 offset-6">
            <Button variant="info" type="submit" block>
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={deleteProductos}>
          Yes
        </Button>
      </Modal.Footer> */}
    </>
  );
}
