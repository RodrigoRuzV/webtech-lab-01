let canciones = [
    { id: 1, titulo: "Smoke on the Water", artista: "Deep Purple", genero: "Hard Rock" },
    { id: 2, titulo: "Sweet Child O' Mine", artista: "Guns N' Roses", genero: "Hard Rock" },
    { id: 3, titulo: "Come As You Are", artista: "Nirvana", genero: "Grunge" },
    { id: 4, titulo: "Nothing Else Matters", artista: "Metallica", genero: "Metal" },
    { id: 5, titulo: "Wonderwall", artista: "Oasis", genero: "Britpop" },
    { id: 6, titulo: "Zombie", artista: "The Cranberries", genero: "Alternative" },
];

let siguienteId = canciones.length + 1;
let textoFiltro = "";

function crearItemCancion(cancion) {
    const item = document.createElement("article");
    item.classList.add("item-cancion");
    item.dataset.id = cancion.id;

    const titulo = document.createElement("h3");
    titulo.textContent = cancion.titulo;

    const artista = document.createElement("p");
    artista.textContent = "Artista: " + cancion.artista;

    const genero = document.createElement("p");
    genero.textContent = "Género: " + cancion.genero;
    genero.classList.add("genero");

    const btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn-eliminar");

    item.append(titulo, artista, genero, btnEliminar);

    return item;
}

function obtenerCancionesFiltradas() {
    const texto = textoFiltro.trim().toLowerCase();

    if (texto === "") {
        return canciones;
    }

    return canciones.filter(function (cancion) {
        return (
            cancion.titulo.toLowerCase().includes(texto) ||
            cancion.artista.toLowerCase().includes(texto) ||
            cancion.genero.toLowerCase().includes(texto)
        );
    });
}

function renderizarCanciones() {
    const contenedor = document.querySelector("#lista-canciones");
    const mensajeSinResultados = document.querySelector("#sin-resultados");
    const lista = obtenerCancionesFiltradas();

    contenedor.innerHTML = "";

    if (lista.length === 0) {
        mensajeSinResultados.hidden = false;
    } else {
        mensajeSinResultados.hidden = true;
        lista.forEach(function (cancion) {
            contenedor.append(crearItemCancion(cancion));
        });
    }
}

document.querySelector("#filtro-texto").addEventListener("input", function (event) {
    textoFiltro = event.target.value;
    renderizarCanciones();
});

document.querySelector("#form-agregar-cancion").addEventListener("submit", function (event) {
    event.preventDefault();

    const inputTitulo = document.querySelector("#nueva-titulo");
    const inputArtista = document.querySelector("#nueva-artista");
    const inputGenero = document.querySelector("#nueva-genero");

    const nuevaCancion = {
        id: siguienteId,
        titulo: inputTitulo.value.trim(),
        artista: inputArtista.value.trim(),
        genero: inputGenero.value.trim(),
    };

    if (nuevaCancion.titulo === "" || nuevaCancion.artista === "" || nuevaCancion.genero === "") {
        return;
    }

    siguienteId = siguienteId + 1;
    canciones.push(nuevaCancion);

    inputTitulo.value = "";
    inputArtista.value = "";
    inputGenero.value = "";
    inputTitulo.focus();

    renderizarCanciones();
});

document.querySelector("#lista-canciones").addEventListener("click", function (event) {
    if (!event.target.classList.contains("btn-eliminar")) {
        return;
    }

    const item = event.target.closest(".item-cancion");
    const id = Number(item.dataset.id);

    canciones = canciones.filter(function (cancion) {
        return cancion.id !== id;
    });

    renderizarCanciones();
});

renderizarCanciones();

document.querySelector("#form-contacto").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#name");
    const email = document.querySelector("#email");
    const mensaje = document.querySelector("#message");

    const errorNombre = document.querySelector("#error-name");
    const errorEmail = document.querySelector("#error-email");
    const errorMensaje = document.querySelector("#error-message-field");
    const confirmacion = document.querySelector("#confirmacion-contacto");

    let esValido = true;

    if (nombre.value.trim() === "") {
        errorNombre.textContent = "Por favor ingresa tu nombre.";
        esValido = false;
    } else {
        errorNombre.textContent = "";
    }

    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronEmail.test(email.value.trim())) {
        errorEmail.textContent = "Ingresa un correo válido, por ejemplo nombre@correo.com.";
        esValido = false;
    } else {
        errorEmail.textContent = "";
    }

    if (mensaje.value.trim().length < 10) {
        errorMensaje.textContent = "Tu mensaje debe tener al menos 10 caracteres.";
        esValido = false;
    } else {
        errorMensaje.textContent = "";
    }

    if (!esValido) {
        confirmacion.textContent = "";
        return;
    }

    confirmacion.textContent = "¡Gracias " + nombre.value.trim() + "! Tu mensaje fue recibido.";
    event.target.reset();
});

["name", "email", "message"].forEach(function (idCampo) {
    document.querySelector("#" + idCampo).addEventListener("input", function () {
        const idError = idCampo === "message" ? "error-message-field" : "error-" + idCampo;
        document.querySelector("#" + idError).textContent = "";
    });
});

document.querySelector("#toggle-modo").addEventListener("click", function (event) {
    const boton = event.target;
    const activo = document.body.classList.toggle("modo-oscuro");

    boton.setAttribute("aria-pressed", activo ? "true" : "false");
    boton.textContent = activo ? "Modo claro" : "Modo oscuro";
});