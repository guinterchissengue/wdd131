// FOOTER DATA
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// STATIC WEATHER VALUES
const temperature = parseFloat(document.getElementById("temp").textContent);
const windSpeed = parseFloat(document.getElementById("wind").textContent);

// WIND CHILL FUNCTION (ONE LINE)
function calculateWindChill(t, w) {
  return 13.12 + 0.6215 * t - 11.37 * Math.pow(w, 0.16) + 0.3965 * t * Math.pow(w, 0.16);
}

// CHECK CONDITIONS
let windChill = "N/A";

if (temperature <= 10 && windSpeed > 4.8) {
  windChill = calculateWindChill(temperature, windSpeed).toFixed(1) + " °C";
}

document.getElementById("windChill").textContent = windChill;