// ==========================================================
// api.js
// Este archivo se encarga únicamente de la comunicación con
// el backend (API REST). No maneja el DOM ni la interfaz.
// ==========================================================

const API_URL = "https://appi-netflix-5.vercel.app";

// Obtener todas las películas guardadas en la base de datos
async function obtenerPeliculas() {

    const respuesta = await fetch(`${API_URL}/peliculas`);

    if (!respuesta.ok) {
        throw new Error("Error al consultar las películas");
    }

    return await respuesta.json();

}

// Agregar (guardar) una nueva película en la base de datos
async function agregarPelicula(pelicula) {

    const respuesta = await fetch(`${API_URL}/peliculas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pelicula)
    });

    if (!respuesta.ok) {
        throw new Error("Error al guardar la película");
    }

    return await respuesta.json();

}