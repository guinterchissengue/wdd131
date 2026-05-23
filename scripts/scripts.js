// Product array
const products = [
    { id: "1", name: "Smart Light Bulb" },
    { id: "2", name: "Smart Thermostat" },
    { id: "3", name: "Smart Door Lock" },
    { id: "4", name: "Smart Speaker" }
];

// Page load
document.addEventListener("DOMContentLoaded", function() {
    
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
        reviewCountEl.textContent = "Number of Reviews: " + count;
    }
});