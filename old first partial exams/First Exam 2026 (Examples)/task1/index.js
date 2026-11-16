// ===== 1. Елементи од HTML =====
const loadBtn = document.getElementById('loadBtn');
const minRatingSelect = document.getElementById('minRating');
const resultsDiv = document.getElementById('results');
const reportDiv = document.getElementById('report');

// Тука ги чуваме сериите по вчитување (за да НЕ правиме нови HTTP барања)
let allShows = [];

const URLS = [
  'https://api.tvmaze.com/search/shows?q=star%20trek',
  'https://api.tvmaze.com/search/shows?q=trek'
];

// ===== 2. Преземање (паралелно) =====
loadBtn.addEventListener('click', async () => {
  const responses = await Promise.all(URLS.map(url => fetch(url)));
  const data = await Promise.all(responses.map(r => r.json()));
  // data = [ резултати од прва адреса, резултати од втора адреса ]

  allShows = mergeById([...data[0], ...data[1]]);
  render();
});

// ===== 3. Спојување по id (се задржува најголем score; при еднакво – првиот) =====
function mergeById(items) {
  const byId = items.reduce((acc, item) => {
    const id = item.show.id;
    if (!acc[id] || item.score > acc[id].score) {   // строго > → при еднакво останува првиот
      acc[id] = item;
    }
    return acc;
  }, {});
  return Object.values(byId).map(item => item.show);
}

// ===== 4. Филтрирање =====
function filterShows(shows, minRating) {
  return shows.filter(s =>
    s.genres.length > 0 &&
    s.rating.average !== null &&
    s.rating.average >= minRating
  );
}

// ===== 5. Групирање по жанр =====
function groupByGenre(shows) {
  return shows.reduce((acc, s) => {
    // отстрани дупликат-жанрови кај иста серија → се брои најмногу еднаш во жанр
    const genres = s.genres.filter((g, i) => s.genres.indexOf(g) === i);
    genres.forEach(g => {
      if (acc[g]) {
        acc[g].push(s);
      } else {
        acc[g] = [s];
      }
    });
    return acc;
  }, {});
}

// ===== 6. Прикажување =====
function render() {
  const minRating = Number(minRatingSelect.value);
  const filtered = filterShows(allShows, minRating);
  const groups = groupByGenre(filtered);   // празни жанрови не настануваат воопшто

  resultsDiv.innerHTML = Object.keys(groups).map(genre => `
    <h2>${genre}</h2>
    ${groups[genre].map(s => `
      <div style="background-color: lightblue;">
        ${s.name} – ${s.rating.average}
      </div>
    `).join('')}
  `).join('');

  reportDiv.innerHTML = `
    <p>Број на жанрови: ${Object.keys(groups).length}</p>
    <p>Број на различни серии: ${filtered.length}</p>
  `;
}

// ===== 7. Промена на оцена → само повторно прикажи (без fetch) =====
minRatingSelect.addEventListener('change', render);
