import { renderListWithTemplate } from "./utils.mjs";
import { capitalizeWords } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }


  async imageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async filterProductsWithImages(list) {
    const checks = await Promise.all(
      list.map(async (product) => {
        const exists = await this.imageExists(product.Images.PrimaryMedium);
        return exists ? product : null;
      })
    );
    return checks.filter(Boolean);
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    const filteredList = await this.filterProductsWithImages(list);
    this.renderList(filteredList);
    document.querySelector(".title").textContent = capitalizeWords(this.category.replace("-", " "));
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}