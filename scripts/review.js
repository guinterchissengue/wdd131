// Increment review counter
window.addEventListener('DOMContentLoaded', () => {
    let count = localStorage.getItem('reviewCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('reviewCount', count);

    document.getElementById('reviewCount').textContent = count;
});