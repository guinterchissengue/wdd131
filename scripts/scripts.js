// Product list (simulating database)
var products = [
    { id: "p1", name: "Smart Light" },
    { id: "p2", name: "Smart Thermostat" },
    { id: "p3", name: "Smart Lock" },
    { id: "p4", name: "Security Camera" }
];

// Get the select element
var select = document.getElementById("product");

// Populate product options dynamically
for (var i = 0; i < products.length; i++) {
    var option = document.createElement("option");
    option.value = products[i].id;
    option.textContent = products[i].name;
    select.appendChild(option);
}