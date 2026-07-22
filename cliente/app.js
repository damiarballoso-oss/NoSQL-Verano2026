
// ==========================================================
// app.js
// Maneja el formulario (guardar película) y la construcción
// de las tarjetas visuales a partir de los datos de la API.
// ==========================================================

// --- Referencias al formulario y sus campos ---
const formulario = document.getElementById("formulario");

const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const año = document.getElementById("año");
const duracion = document.getElementById("duracion");
const idioma = document.getElementById("idioma");
const calificacion = document.getElementById("calificacion");

// --- Referencias para consultar y mostrar el listado ---
const btnConsultar = document.getElementById("btnConsultar");
const listaPeliculas = document.getElementById("listaPeliculas");

// Imagen por defecto (SVG en base64) que se usa cuando la película
// no trae una imagen guardada en la base de datos.
// Puedes reemplazar esta constante por una URL de imagen propia
// o, más adelante, por un campo "imagen" que venga de la API.
const IMAGEN_POR_DEFECTO =
    "data:image/svg+xml;utf8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="160" viewBox="0 0 300 260">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#f9a8d4"/>
                    <stop offset="100%" stop-color="#b794f6"/>
                </linearGradient>
            </defs>
            <rect width="300" height="260" fill="url(#g)"/>
            <text x="50%" y="52%" font-size="60" text-anchor="middle" dominant-baseline="middle">🎬</text>
        </svg>
    `);

// Evita que al pasar el scroll del mouse sobre un input numérico
// (año, duración, calificación) su valor cambie sin querer,
// que era lo que provocaba que apareciera "-1".
document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("wheel", (e) => input.blur());
});

// ----------------------------------------------------------
// Evento: Guardar película (envío del formulario)
// ----------------------------------------------------------
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const pelicula = {
        titulo: titulo.value,
        genero: genero.value,
        año: Number(año.value),
        duracion: Number(duracion.value),
        idioma: idioma.value,
        calificacion: Number(calificacion.value)
    };

    try {

        const respuesta = await agregarPelicula(pelicula);

        alert(respuesta.mensaje);

        formulario.reset();

    } catch (error) {

        alert(error.message);

    }

});

// ----------------------------------------------------------
// Evento: Consultar películas y pintarlas como tarjetas
// ----------------------------------------------------------
btnConsultar.addEventListener("click", async () => {

    try {

        const peliculas = await obtenerPeliculas();

        // Limpiamos el contenedor antes de volver a pintar
        listaPeliculas.innerHTML = "";

        peliculas.forEach((pelicula) => {
            const tarjeta = crearTarjetaPelicula(pelicula);
            listaPeliculas.appendChild(tarjeta);
        });

    } catch (error) {

        alert(error.message);

    }

});

// ----------------------------------------------------------
// Función auxiliar: construye el HTML de una tarjeta de
// película a partir del objeto que devuelve la API.
// ----------------------------------------------------------
function crearTarjetaPelicula(pelicula) {

    // Tarjeta contenedora
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-pelicula";

    // Contenedor de la imagen + insignia de calificación
    const imagenWrapper = document.createElement("div");
    imagenWrapper.className = "tarjeta-imagen-wrapper";

    const img = document.createElement("img");
    // Si la película trae su propia imagen (pelicula.imagen) se usa,
    // si no, se muestra la imagen por defecto.
    img.src = pelicula.imagen || IMAGEN_POR_DEFECTO;
    img.alt = pelicula.titulo;

    const badge = document.createElement("span");
   
   

    imagenWrapper.appendChild(img);
    imagenWrapper.appendChild(badge);

    // Bloque de información textual
    const info = document.createElement("div");
    info.className = "tarjeta-info";
    info.innerHTML = `
        <h3>${pelicula.titulo}</h3>
        <p><span>Género</span> ${pelicula.genero}</p>
        <p><span>Año</span> ${pelicula.año}</p>
        <p><span>Duración</span> ${pelicula.duracion} min</p>
        <p><span>Idioma</span> ${pelicula.idioma}</p>
    `;

    tarjeta.appendChild(imagenWrapper);
    tarjeta.appendChild(info);

    return tarjeta;
}