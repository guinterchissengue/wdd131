// Product array
const products = [
    { id: 1, name: "Smart Light" },
    { id: 2, name: "Smart Thermostat" },
    { id: 3, name: "Smart Door Lock" },
    { id: 4, name: "Smart Security Camera" }
];

// Populate product select dynamically
window.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('product');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id; 
        option.textContent = product.name;
        select.appendChild(option);
    });
});