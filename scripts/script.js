const products = [
    { id: "1", name: "Smart Light Bulb" },
    { id: "2", name: "Smart Thermostat" },
    { id: "3", name: "Smart Door Lock" },
    { id: "4", name: "Smart Speaker" }
];

document.addEventListener("DOMContentLoaded", () => {

    const productSelect = document.getElementById("product");

    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    const reviewCountElement = document.getElementById("reviewCount");

    if (reviewCountElement) {
        let count = localStorage.getItem("reviewCount") || 0;
        count = Number(count) + 1;
        localStorage.setItem("reviewCount", count);

        reviewCountElement.textContent = "Number of Reviews: " + count;
    }
});