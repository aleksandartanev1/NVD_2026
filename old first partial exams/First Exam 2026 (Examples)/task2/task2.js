function average(values) {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
}
async function main() {
    const cities = ["Скопје", "Охрид", "Битола"];
    const responses = await Promise.all([
        fetch("https://archive-api.open-meteo.com/v1/archive?latitude=41.9981&longitude=21.4254&…")
            .then(response => response.json()),
        fetch("https://archive-api.open-meteo.com/v1/archive?latitude=41.1172&longitude=20.8016&…")
            .then(response => response.json()),
        fetch("https://archive-api.open-meteo.com/v1/archive?latitude=41.0314&longitude=21.3347&…")
            .then(response => response.json())
    ]);

// … the URLs continue with the same parameters as on the task slide


    const data = responses.map(({ hourly }, index) => {
        const records = hourly.time.map((time, i) => ({
            city: cities[index],
            time,
            hour: Number(time.slice(11, 13)),
            temperature: hourly.temperature_2m[i],
            rain: hourly.precipitation[i],
            wind: hourly.wind_speed_10m[i]
        })).filter(record =>
            record.temperature !== null && record.rain !== null && record.wind !== null
        );
        return { city: cities[index], records };
    });
    const reports = data.map(city => ({
        city: city.city,
        averageTemperature: average(city.records.map(record => record.temperature)),
        maxWind: Math.max(...city.records.map(record => record.wind)),
        totalRain: city.records.reduce((sum, record) => sum + record.rain, 0),
        rainyHours: city.records.filter(record => record.rain > 0).length
    })).sort((a, b) => b.averageTemperature - a.averageTemperature);





    const periods = ["Ноќ", "Утро", "Попладне", "Вечер"];
    const grouped = data.map(city => {
        const groups = periods.map((period, i) => ({
            period,
            records: city.records.filter(record => Math.floor(record.hour / 6) === i)
        })).filter(group => group.records.length > 0).map(group => ({
            period: group.period,
            count: group.records.length,
            averageTemperature: average(group.records.map(record => record.temperature))
        }));
        return { city: city.city, groups };
    });


    const topFive = data.flatMap(city => city.records)
        .sort((a, b) => b.temperature - a.temperature)
        .slice(0, 5)
        .map(record => ({
            city: record.city,
            time: record.time,
            temperature: record.temperature
        }));
    const allHaveDryHour = data.every(city =>
        city.records.some(record => record.rain === 0)
    );
}



function createTemperatureMonitor(limit) {
    let temperatures = [];
    let total = 0;
    return function (temperature) {
        temperatures = [...temperatures, temperature].slice(-limit);
        total++;
        return {
            temperatures: [...temperatures],
            average: temperatures.reduce((sum, value) => sum + value, 0) / temperatures.length,
            max: Math.max(...temperatures),
            total
        };
    };
}
main().catch(console.error);


const monitor = createTemperatureMonitor(3);
[10, 20, 30, 40].forEach(t => console.log(JSON.stringify(monitor(t))));
// output:
const result = monitor(50);
result.temperatures.push(999); // change the returned copy
console.log(JSON.stringify(monitor(60)));
// output:
