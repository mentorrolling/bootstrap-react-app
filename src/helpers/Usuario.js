export const getUsuario = async () => {
  //obtengo los datos del token, id del localStorage
  // para enviarlos como parámetros
  let token = JSON.parse(localStorage.getItem("token"));
  let id = JSON.parse(localStorage.getItem("id"));
  try {
    const resp = await fetch(`http://localhost:3005/usuario/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: `${token}`,
      },
    });
    const data = await resp.json();

    //Almaceno en el estado usuario los datos obtenidos
    return {
      nombre: data.usuario.nombre,
      email: data.usuario.email,
      role: data.usuario.role,
    };
  } catch (error) {
    return console.log(error);
  }
};
