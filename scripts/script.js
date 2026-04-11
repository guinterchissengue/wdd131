// Product data array - used to populate dropdown
const products = [
    { id: "smart-light", name: "Smart Light Bulb" },
    { id: "thermostat", name: "Smart Thermostat" },
    { id: "door-lock", name: "Smart Door Lock" },
    { id: "speaker", name: "Smart Speaker" }
];

// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    
    // Populate product dropdown on form page
    const productSelect = document.getElementById("product");
    if (productSelect) {
        products.forEach(product => {
            let option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
        
        // Set max date to today
        document.getElementById("date").max = new Date().toISOString().split("T")[0];
        
        // Handle form submit
        document.getElementById("reviewForm").addEventListener("submit", saveReview);
    }
    
    // Show review count and details on review page
    const reviewCountEl = document.getElementById("reviewCount");
    if (reviewCountEl) {
        showReviewDetails();
        updateReviewCount();
    }
});

function saveReview(event) {
    event.preventDefault();
    
    // Get all form data
    const formData = new FormData(event.target);
    const review = {
        product: formData.get("product"),
        rating: formData.get("rating"),
        date: formData.get("date"),
        features: formData.getAll("features"),
        review: formData.get("review") || "No written review",
        username: formData.get("username") || "Anonymous"
    };
    
    // Save to localStorage
    let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    
    // Update counter
    let count = parseInt(localStorage.getItem("reviewCount") || "0") + 1;
    localStorage.setItem("reviewCount", count);
    
    // Go to review page
    window.location.href = "review.html";
}

function showReviewDetails() {
    // Get the last review submitted
    let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    let lastReview = reviews[reviews.length - 1];
    
    if (lastReview) {
        document.getElementById("product-name").textContent = 
            products.find(p => p.id === lastReview.product)?.name || lastReview.product;
        document.getElementById("rating-display").textContent = 
            "★".repeat(lastReview.rating) + "☆".repeat(5 - lastReview.rating);
        document.getElementById("install-date").textContent = lastReview.date;
        document.getElementById("features-list").textContent = 
            lastReview.features.length ? lastReview.features.join(", ") : "None selected";
        document.getElementById("review-content").textContent = lastReview.review;
        document.getElementById("user-name").textContent = lastReview.username;
    }
}

function updateReviewCount() {
    let count = parseInt(localStorage.getItem("reviewCount") || "0");
    document.getElementById("reviewCount").textContent = `Total Reviews: ${count}`;
}