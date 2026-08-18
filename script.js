const canciones = [
    { titulo: "Smoke on the Water", artista: "Deep Purple", genero: "Hard Rock" },
    { titulo: "Sweet Child O' Mine", artista: "Guns N' Roses", genero: "Hard Rock" },
    { titulo: "Come As You Are", artista: "Nirvana", genero: "Grunge" },
    { titulo: "Nothing Else Matters", artista: "Metallica", genero: "Metal" },
    { titulo: "Wonderwall", artista: "Oasis", genero: "Britpop" },
    { titulo: "Zombie", artista: "The Cranberries", genero: "Alternative" },
];

function crearItemCancion(cancion) {
    const item = document.createElement("article");
    item.classList.add("item-cancion");

    const titulo = document.createElement("h3");
    titulo.textContent = cancion.titulo;

    const artista = document.createElement("p");
    artista.textContent = "Artista: " + cancion.artista;

    const genero = document.createElement("p");
    genero.textContent = "Género: " + cancion.genero;
    genero.classList.add("genero");

    item.append(titulo, artista, genero);

    return item;
}

function renderizarCanciones(lista) {
    const contenedor = document.querySelector("#lista-canciones");
    contenedor.innerHTML = ""; // limpia antes de volver a dibujar

    lista.forEach(function (cancion) {
        const item = crearItemCancion(cancion);
        contenedor.append(item);
    });
}

renderizarCanciones(canciones);