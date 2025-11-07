// =============================
//  SCRIPT PRINCIPAL — TIENDA APK
// =============================

// Datos de ejemplo (puedes sustituirlos por un fetch a un servidor o JSON)
const games = [
  {
    id: 1,
    title: "Shadow Arena",
    genre: "Acción",
    dev: "Black Fox Studio",
    img: "https://picsum.photos/300/200?random=1",
    desc: "Lucha en combates intensos con personajes únicos y entornos oscuros.",
    apk: "#"
  },
  {
    id: 2,
    title: "Pixel Drift",
    genre: "Carreras",
    dev: "Skybit",
    img: "https://picsum.photos/300/200?random=2",
    desc: "Derrapa por circuitos urbanos y desbloquea coches legendarios.",
    apk: "#"
  },
  {
    id: 3,
    title: "Farm Life 3D",
    genre: "Simulación",
    dev: "Greensoft",
    img: "https://picsum.photos/300/200?random=3",
    desc: "Crea tu propia granja, cuida animales y cultiva para crecer.",
    apk: "#"
  },
  {
    id: 4,
    title: "Zeta Ops",
    genre: "Disparos",
    dev: "Nova Edge",
    img: "https://picsum.photos/300/200?random=4",
    desc: "Juego táctico FPS con escuadrones y modo multijugador.",
    apk: "#"
  }
];

// Elementos del DOM
const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const orderSelect = document.getElementById("orderSelect");
const resultsInfo = document.getElementById("count");

// Modal
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

// =============================
//  FUNCIONES PRINCIPALES
// =============================

// Mostrar catálogo
function renderCatalog(list) {
  catalog.innerHTML = "";
  list.forEach(game => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${game.img}" alt="${game.title}">
      <div class="info">
        <h3>${game.title}</h3>
        <p>${game.genre} — ${game.dev}</p>
      </div>
    `;
    card.addEventListener("click", () => openModal(game));
    catalog.appendChild(card);
  });
  resultsInfo.textContent = list.length;
}

// Abrir modal con detalle
function openModal(game) {
  modalContent.innerHTML = `
    <h2>${game.title}</h2>
    <p><strong>Género:</strong> ${game.genre}</p>
    <p><strong>Desarrollador:</strong> ${game.dev}</p>
    <p>${game.desc}</p>
    <a href="${game.apk}" class="download-btn" target="_blank">Descargar APK</a>
  `;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

// Cerrar modal
modalClose.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
});

// Filtro de búsqueda y género
function filterGames() {
  const text = searchInput.value.toLowerCase();
  const genre = genreFilter.value;
  let filtered = games.filter(game =>
    game.title.toLowerCase().includes(text) ||
    game.dev.toLowerCase().includes(text) ||
    game.genre.toLowerCase().includes(text)
  );

  if (genre) {
    filtered = filtered.filter(game => game.genre.toLowerCase() === genre.toLowerCase());
  }

  // Ordenar resultados
  switch (orderSelect.value) {
    case "new":
      filtered = filtered.reverse();
      break;
    case "old":
      // Mantiene orden original (puedes invertir si lo necesitas)
      break;
    case "relevance":
    default:
      // Ningún cambio
      break;
  }

  renderCatalog(filtered);
}

// =============================
//  EVENTOS
// =============================
searchInput.addEventListener("input", filterGames);
genreFilter.addEventListener("change", filterGames);
orderSelect.addEventListener("change", filterGames);

// =============================
//  INICIALIZACIÓN
// =============================

// Cargar géneros únicos en el select
function loadGenres() {
  const genres = [...new Set(games.map(g => g.genre))];
  genres.forEach(g => {
    const option = document.createElement("option");
    option.value = g.toLowerCase();
    option.textContent = g;
    genreFilter.appendChild(option);
  });
}

// Inicializar la app
loadGenres();
renderCatalog(games);