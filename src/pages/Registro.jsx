import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import Logo from "../images/logo.png";
import Portada from "../images/registro.svg";

export default function Registro(props) {
  const [usuario, setUsuario] = useState({
    form: {
      nombre: "",
      email: "",
      password: "",
    },
    loading: false,
    error: null,
  });
  const [validar, setValidar] = useState(false);

  const limpiarCampos = () => {
    setUsuario({
      ...usuario,
      form: {
        nombre: "",
        email: "",
        password: "",
      },
    });
  };

  const handleChange = ({ target }) => {
    setUsuario({
      ...usuario,
      form: {
        ...usuario.form,
        [target.name]: target.value,
      },
      error: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem("token"));
    setUsuario({
      ...usuario,
      loading: true,
    });
    try {
      const resp = await fetch("http://localhost:3005/usuario", {
        method: "POST",
        body: JSON.stringify(usuario.form),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      });
      const data = await resp.json();

      if (data.ok) {
        setUsuario({
          ...usuario,
          loading: false,
        });

        setValidar(true);

        console.log(data);

        limpiarCampos();
      } else {
        setUsuario({
          ...usuario,
          loading: false,
          error: data.err.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav
        id="navLogin"
        className="navbar navbar-dark bg-dark d-flex justify-content-center"
      >
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <img className=" w-100" src={Portada} alt="Portada" />
          </div>
          <div className="col-12 col-md-4">
            <h2>Registrate ☕</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>🙍‍♂️ Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  autoComplete="off"
                  name="nombre"
                  onChange={handleChange}
                  value={usuario.form.nombre}
                  disabled={usuario.loading ? true : false}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>📧 Correo electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su Email"
                  autoComplete="off"
                  name="email"
                  onChange={handleChange}
                  value={usuario.form.email}
                  disabled={usuario.loading ? true : false}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>🔐Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  name="password"
                  onChange={handleChange}
                  value={usuario.form.password}
                  disabled={usuario.loading ? true : false}
                  required
                />
              </Form.Group>
              {usuario.error !== null && (
                <Alert variant="danger">{usuario.error}</Alert>
              )}

              {validar && (
                <Alert variant="success">
                  <span>Te registraste con éxito! Ahora puedes </span>{" "}
                  <Link to="/">Loguearte</Link>
                </Alert>
              )}
              <div className="d-flex justify-content-end">
                <Button
                  variant="info"
                  type="submit"
                  disabled={usuario.loading ? true : false}
                >
                  Registrar
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
