 import { getLocalStorage, setLocalStorage, alertMessage } from './utils.mjs';
 import { capitalizeWords } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    async addProductToCart() {
        let cart = await getLocalStorage('so-cart') || [];
        cart.push(this.product);
        await setLocalStorage('so-cart', cart);
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);

        // Add spin animation to cart icon
        const cartIcon = document.querySelector('.cart');
        if (cartIcon) {
          cartIcon.classList.add('spin');
          setTimeout(() => {
            cartIcon.classList.remove('spin');
          }, 700);
        }
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
  document.querySelector('h2').textContent = capitalizeWords(product.Brand.Name);
  document.querySelector('h3').textContent = capitalizeWords(product.NameWithoutBrand);

  const productImage = document.getElementById('productImage');
  productImage.src = product.Images.PrimaryLarge || product.Images.PrimaryMedium;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById('productPrice').textContent = product.FinalPrice;
  document.getElementById('productColor').textContent = product.Colors[0].ColorName;
  document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

  document.getElementById('addToCart').dataset.id = product.Id;
}