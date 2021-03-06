//Obtengo los datos de los productos----------------------
export const getProductos = async (page) => {
  let token = JSON.parse(localStorage.getItem("token"));
  try {
    // envío los parámetros para la paginacion y defino el desde con el valor
    // del estado page
    const resp = await fetch(
      `http://localhost:3005/producto?limite=5&desde=${page}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: `${token}`,
        },
      }
    );
    const data = await resp.json();

    //Almaceno en el estado lista los datos obtenidos
    return {
      datos: data.productos,
      loading: false,
      cantidad: data.cantidad,
      error: null,
    };
  } catch (error) {
    return {
      datos: {},
      loading: false,
      error: error,
    };
  }
};
//-----------------------------------------------------
