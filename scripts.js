// ...existing code...

// Event listener untuk tombol cari cuaca
document.getElementById('search-btn').addEventListener('click', function () {
    const location = document.getElementById('location-input').value.trim();
    if (!location) return;

    // Ganti dengan API key Anda sendiri
    const apiKey = 'f43c852c798e0bbd48b1ced9dcaecbf9';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=id`;

    axios.get(url)
        .then(response => {
            displayDetailedWeather(response.data);
        })
        .catch(error => {
            document.getElementById('current-weather').innerHTML = '<p>Lokasi tidak ditemukan.</p>';
            document.getElementById('air-quality').innerHTML = '';
            document.getElementById('humidity-pressure').innerHTML = '';
            document.getElementById('wind-sun').innerHTML = '';
        });
});

// Fungsi untuk menampilkan cuaca detail (sudah ada di index.html, bisa dipindahkan ke sini)
function displayDetailedWeather(data) {
    const weatherDiv = document.getElementById('current-weather');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDiv.innerHTML = `
        <div class="current-main">
            <h3>${data.name}</h3>
            <img src="${iconUrl}" alt="Weather icon">
            <p class="temp-main">${Math.round(data.main.temp)}°C</p>
            <p class="weather-desc">${data.weather[0].description}</p>
        </div>
    `;

    // Air quality (dummy data)
    document.getElementById('air-quality').innerHTML = `
        <p>Indeks: 85 (Baik)</p>
        <p>PM2.5: 12 µg/m³</p>
    `;

    // Humidity and pressure
    document.getElementById('humidity-pressure').innerHTML = `
        <p>Kelembaban: ${data.main.humidity}%</p>
        <p>Tekanan: ${data.main.pressure} hPa</p>
        <p>Dew Point: ${Math.round(data.main.feels_like)}°C</p>
    `;

    // Wind and sun
    document.getElementById('wind-sun').innerHTML = `
        <p>Angin: ${data.wind.speed} m/s (${data.wind.deg}°)</p>
        <p>Awan: ${data.clouds.all}%</p>
        <p>UV: 6 (Sedang)</p>
    `;
}

// Fitur pelaporan sederhana
document.getElementById('report-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const lokasi = document.getElementById('report-location').value;
    const jenis = document.getElementById('report-type').value;
    const deskripsi = document.getElementById('report-desc').value;

    alert(`Laporan terkirim!\nLokasi: ${lokasi}\nJenis: ${jenis}\nDeskripsi: ${deskripsi}`);
    this.reset();
});

// ...existing code...