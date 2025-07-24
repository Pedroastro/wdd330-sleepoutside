import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const product = new ProductData();
const element = document.querySelector('.product-list');
const productList = new ProductList(category, product, element);

productList.init();