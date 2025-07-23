import ShoppingCart from './ShoppingCart.mjs';
import { loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const cart = new ShoppingCart();
cart.renderCartContents();
