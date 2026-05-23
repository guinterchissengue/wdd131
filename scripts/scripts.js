// Product array
const products = [
    { id: "1", name: "Smart Light Bulb" },
    { id: "2", name: "Smart Thermostat" },
    { id: "3", name: "Smart Door Lock" },
    { id: "4", name: "Smart Speaker" }
];

// Footer dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind Chill Function (one line)
function calculateWindChill(temp, speed) {
    return `${(13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1)} °C`;
}

// Page load
document.addEventListener("DOMContentLoaded", function () {

    // Form page
    const productSelect = document.getElementById("product");

    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");

            option.value = product.id;
            option.textContent = product.name;

            productSelect.appendChild(option);
        });
    }

    // Review page
    const reviewCountEl = document.getElementById("reviewCount");

    if (reviewCountEl) {
        let count = localStorage.getItem("reviewCount") || 0;

        count = Number(count) + 1;

        localStorage.setItem("reviewCount", count);

        reviewCountEl.textContent = `Number of Reviews: ${count}`;
    }

    // Wind Chill
    const tempElement = document.getElementById("temp");
    const windElement = document.getElementById("wind");
    const windChillElement = document.getElementById("windChill");

    // Only run if elements exist
    if (tempElement && windElement && windChillElement) {

        const temp = parseFloat(tempElement.textContent);
        const wind = parseFloat(windElement.textContent);

        // Conditions for wind chill calculation
        if (temp <= 10 && wind > 4.8) {
            windChillElement.textContent = calculateWindChill(temp, wind);
        } else {
            windChillElement.textContent = "N/A";
        }
    }
});