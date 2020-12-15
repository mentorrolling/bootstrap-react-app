import React from "react";

import { Form, Button } from "react-bootstrap";

export default function FormRegistro() {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
}
