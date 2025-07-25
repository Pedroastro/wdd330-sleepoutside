import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();

// function addProductToCart(product) {
//   let cart = getLocalStorage('so-cart') || [];
//   cart.push(product);
//   setLocalStorage('so-cart', cart);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById('addToCart')
//   .addEventListener('click', addToCartHandler);
