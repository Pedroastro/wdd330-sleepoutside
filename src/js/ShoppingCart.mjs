import { getLocalStorage } from './utils.mjs';

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor() {
    this.cartItems = this.getCartItems();
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem('so-cart')) || [];
  }

  addToCart(product) {
    this.cartItems.push(product);
    this.saveCartItems();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCartItems();
  }

  saveCartItems() {
    localStorage.setItem('so-cart', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    this.saveCartItems();
  }

  renderCartContents() {
    const cartItems = getLocalStorage('so-cart');
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
  
    const cartFooter = document.querySelector('.cart-footer');
    const cartTotalElem = document.querySelector('.cart-total');
    if (cartItems.length > 0) {
      cartFooter.classList.remove('hide');
      const total = cartItems
        .reduce((sum, item) => sum + Number(item.FinalPrice), 0)
        .toFixed(2);
      cartTotalElem.innerHTML = `Total: $${total}`;
    } else {
      cartFooter.classList.add('hide');
      cartTotalElem.innerHTML = 'Total: $0.00';
    }
  }
}
