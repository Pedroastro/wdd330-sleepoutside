// Example items to add to the cart
const itemsToAdd = [
    { name: "Soda", qty: 2 },
    { name: "Juice", qty: 1 },
    { name: "Water", qty: 3 }
];

// Retrieve cart from localStorage or initialize as empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart items to the page
const cartContainer = document.getElementById('cartContainer');

if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
} else {
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-qty">Qty: ${item.qty || 1}</span>
        </div>
    `).join('');
}