import React, { useState } from "react";

import { Form, Button, Alert } from "react-bootstrap";

export default function FormRegistro(props) {
  const [user, setUser] = useState({
    form: {
      email: "",
      password: "",
    },
  });
  const [login, setLogin] = useState({
    token: "",
    error: null,
    ok: true,
    loading: false,
  });

  //Manejo los cambios del formulario
  const handleChange = ({ target }) => {
    setUser({
      form: {
        ...user.form,
        [target.name]: target.value,
      },
    });
  };

  //Manejo el clic de submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    //seteo login en verdadero
    setLogin({
      loading: true,
    });
    try {
      //Método POST para enviar info de datos de usuario al servidor
      const resp = await fetch("http://localhost:3005/login", {
        method: "POST",
        body: JSON.stringify(user.form),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await resp.json();

      //si la peticion devuelve ok:true
      if (data.ok) {
        setLogin({
          token: data.token,
          error: null,
          ok: true,
          loading: false,
        });
        //Guardo en LocalStorage el token válido
        localStorage.setItem("token", JSON.stringify(data.token));

        //Seteo la el estado ingreso de Login.jsx
        props.setIngreso({
          token: localStorage.getItem("token"),
          id: data.usuario._id,
        });

        //Si ok:false devuelvo el mensaje de error si usuario o contraseña son incorrectos
      } else {
        setLogin({
          token: "",
          error: data.err.message,
          ok: false,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={user.form.email}
          onChange={handleChange}
          required
          disabled={login.loading ? true : false}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={user.form.password}
          onChange={handleChange}
          disabled={login.loading ? true : false}
          required
        />
      </Form.Group>
      {login.ok === false && <Alert variant="danger">{login.error}</Alert>}
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          type="submit"
          disabled={login.loading ? true : false}
        >
          Enviar
        </Button>
      </div>
    </Form>
  );
}
