const CITIES = [
  { name: 'Скопје', url: 'https://archive-api.open-meteo.com/v1/archive?latitude=41.9981&longitude=21.4254&start_date=2025-06-15&end_date=2025-06-15&hourly=temperature_2m,precipitation,wind_speed_10m&timezone=UTC' },
  { name: 'Охрид',  url: 'https://archive-api.open-meteo.com/v1/archive?latitude=41.1172&longitude=20.8016&start_date=2025-06-15&end_date=2025-06-15&hourly=temperature_2m,precipitation,wind_speed_10m&timezone=UTC' },
  { name: 'Битола', url: 'https://archive-api.open-meteo.com/v1/archive?latitude=41.0314&longitude=21.3347&start_date=2025-06-15&end_date=2025-06-15&hourly=temperature_2m,precipitation,wind_speed_10m&timezone=UTC' }
];

// ===== Помошни =====
const sum = arr => arr.reduce((a, x) => a + x, 0);
const avg = arr => sum(arr) / arr.length;

// Од одговорот на API → низа од објекти по час, без null
function toRecords(data) {
  const h = data.hourly;
  return h.time
    .map((time, i) => ({
      time,
      temp: h.temperature_2m[i],
      precip: h.precipitation[i],
      wind: h.wind_speed_10m[i]
    }))
    .filter(r => r.temp !== null && r.precip !== null && r.wind !== null);
}

// Извештај за еден град
function makeReport(city) {
  const r = city.records;
  return {
    name: city.name,
    avgTemp: avg(r.map(x => x.temp)),
    maxWind: r.reduce((m, x) => x.wind > m ? x.wind : m, -Infinity),
    totalPrecip: sum(r.map(x => x.precip)),
    rainyHours: r.filter(x => x.precip > 0).length
  };
}

// Дел од денот според часот ("2025-06-15T13:00" → 13)
function partOfDay(time) {
  const hour = Number(time.slice(11, 13));
  return ['Ноќ', 'Утро', 'Попладне', 'Вечер'][Math.floor(hour / 6)];
}

// Групирање по дел од денот (групирањето од вечерва!)
function groupByPart(records) {
  const groups = records.reduce((acc, r) => {
    const part = partOfDay(r.time);
    if (acc[part]) acc[part].push(r);
    else acc[part] = [r];
    return acc;
  }, {});
  // само групи што постојат → празните автоматски ги нема
  return Object.keys(groups).map(part => ({
    part,
    count: groups[part].length,
    avgTemp: avg(groups[part].map(r => r.temp))
  }));
}

// ===== Главна програма =====
async function main() {
  const responses = await Promise.all(CITIES.map(c => fetch(c.url)));
  const data = await Promise.all(responses.map(r => r.json()));

  const cities = CITIES.map((c, i) => ({ name: c.name, records: toRecords(data[i]) }));

  // 1) Извештаи, сортирани по просечна температура опаѓачки
  const reports = cities.map(makeReport).sort((a, b) => b.avgTemp - a.avgTemp);
  console.log('=== Извештаи ===');
  reports.forEach(r => console.log(r));

  // 2) Групи по дел од денот
  console.log('=== Делови од денот ===');
  cities.forEach(c => console.log(c.name, groupByPart(c.records)));

  // 3) Топ 5 најтопли записи од сите градови
  const top5 = cities
    .flatMap(c => c.records.map(r => ({ city: c.name, time: r.time, temp: r.temp })))
    .sort((a, b) => b.temp - a.temp)
    .slice(0, 5);
  console.log('=== Топ 5 ===');
  top5.forEach(r => console.log(r.city, r.time, r.temp));

  // 4) Дали секој град има барем еден час без врнежи
  console.log('=== Секој град има час без врнежи? ===');
  console.log(cities.every(c => c.records.some(r => r.precip === 0)));
}

main();

// ===== Closure: createTemperatureMonitor =====
function createTemperatureMonitor(limit) {
  let temps = [];   // приватно – достапно само преку closure
  let total = 0;

  return function (t) {
    total++;
    temps = [...temps, t].slice(-limit);   // ги чува само последните limit
    return {
      temps: [...temps],                   // КОПИЈА → промена надвор не влијае
      avg: avg(temps),
      max: Math.max(...temps),
      total
    };
  };
}

const m1 = createTemperatureMonitor(3);
const m2 = createTemperatureMonitor(2);   // независна инстанца
console.log(m1(10));
console.log(m1(20));
console.log(m1(30));
console.log(m1(40));   // { temps: [20, 30, 40], avg: 30, max: 40, total: 4 }
console.log(m2(5));    // { temps: [5], avg: 5, max: 5, total: 1 }
