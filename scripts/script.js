// Array of products to populate the select dropdown dynamically
const products = [
    { id: "1", name: "Smart Light Bulb" },
    { id: "2", name: "Smart Thermostat" },
    { id: "3", name: "Smart Door Lock" },
    { id: "4", name: "Smart Speaker" }
];

// This function runs when the page content is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    
    const productSelect = document.getElementById("product");

    if (productSelect) {
        // Loop 
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name; 
            productSelect.appendChild(option);
        });
    }

    // localStorage
    let count = localStorage.getItem('reviewCount') || 0;  
    count = parseInt(count) + 1;  
    localStorage.setItem('reviewCount', count); 

     const reviewCountElement = document.getElementById('reviewCount');
    if (reviewCountElement) {
        
        reviewCountElement.textContent = `Number of Reviews: ${count}`;
    }
});
