const baseUrl = 'https://dragonball-api.com/api/characters';
let currentPage = 1;
const limit = 10;

const dragonball = document.getElementById("dragonball");
const nextBtn = document.getElementById("nextPage");
const prevBtn = document.getElementById("prevPage");

function showData(dataArray) {
  dragonball.innerHTML = ""; // Limpia el contenido anterior
  for (const item of dataArray) {
    let cardDiv = document.createElement('div');
    cardDiv.className = "cardDragon";
    cardDiv.innerHTML = `
      <img src="${item.image}" alt="${item.description}">
      <p class="nombre">${item.name}</p>
      <p class="ki">Ki: ${item.ki}</p>
      <p class="maxki">MaxKi: ${item.maxKi}</p>
      <p class="race">Race: ${item.race}</p>
      <p class="gender">Gender: ${item.gender}</p>
      <p class="description">Description: ${item.description}</p>
      <p class="affiliation">Affiliation: ${item.affiliation}</p>
    `;
    dragonball.appendChild(cardDiv);
  }
}

function loadPage(page) {
  fetch(`${baseUrl}?page=${page}&limit=${limit}`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      console.log(data);
      showData(data.items);
    })
    .catch(err => {
      console.error(err);
      let message = err.statusText || "Ocurrió un error";
      dragonball.innerHTML = `<p>Error ${err.status || ''}: ${message}</p>`;
    })
    .finally(() => {
      console.log(`Página ${page} cargada.`);
    });
}

// Botón siguiente
nextBtn.addEventListener("click", () => {
  currentPage++;
  loadPage(currentPage);
});

// Botón anterior
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadPage(currentPage);
  }
});

// Cargar la primera página al inicio
loadPage(currentPage);


