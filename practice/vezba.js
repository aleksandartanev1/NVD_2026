async function main() {

    const URLS = [
        {
            name: "Skopje", url: "https://archive-api.open-meteo.com/v1/archive?latitude=41.9981&longitude=21.4254&start_date=2025-06-15&end_date=2025-06-15&hourly=temperature_2m,precipitation,wind_speed_10m&timezone=UTC"
        },
        {
            name:"Ohrid", url: "https://archive-api.open-meteo.com/v1/archive?latitude=41.1172&longitude=20.8016&start_date=2025-06-15&end_date=2025-06-15&hourly=temperature_2m,precipitation,wind_speed_10m&timezone=UTC"
        },
        {
            name:"Bitola", url: "https://archive-api.open-meteo.com/v1/archive?latitude=41.0314&longitude=21.3347&start_date=2025-06-15&end_date=2025-06-15&hourly=temperature_2m,precipitation,wind_speed_10m&timezone=UTC"
        }
    ]

    const responses = await Promise.all(URLS.map(u => fetch(u.url)))
    const data = await Promise.all(responses.map(r => r.json()))
    console.log(data.length)
    console.log(data[1].hourly.temperature_2m)

    const h = data[0].hourly;   // кратенка, за да не пишуваме data[0].hourly секаде

    const records = h.time.map((time, i) => ({
        time: time,
        temp: h.temperature_2m[i],
        precip: h.precipitation[i],
        wind: h.wind_speed_10m[i]
    }))
       .filter(r => r.time !== null
       && r.temp !== null
       && r.precip !== null
       && r.wind !== null)

    console.log(records);
}
main()