import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = 0;
      this.list.forEach(item => {
        this.itemTotal += item.FinalPrice || 0;
      });
    const subtotalElem = document.querySelector('#orderSubtotal');
    if (subtotalElem) {
      subtotalElem.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.list.length == 1 ? 10 : ((this.list.length - 1) * 2) + 10;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #orderTax`);
    const shipping = document.querySelector(`${this.outputSelector} #orderShipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);


    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
  
  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    // Format expiration date as M/YY
    if (order.expiration) {
      const [year, month] = order.expiration.split("-");
      order.expiration = `${parseInt(month, 10)}/${year.slice(-2)}`;
    }

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.tax = this.tax.toFixed(2);
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    // console.log(order);

    try {
      const response = await services.checkout(order);
      console.log(response);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  }
}