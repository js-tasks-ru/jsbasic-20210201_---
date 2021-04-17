import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(function(item){ return item.product.id == product.id });
		if (cartItem) cartItem.count += 1;
		else {
			cartItem = {
				product: product, 
				count: 1
			  };
			this.cartItems.push(cartItem);
		}
		this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
		let cartIndex = this.cartItems.findIndex(function(item){ return item.product.id == productId });
		
		let cartItem = this.cartItems[cartIndex];
		cartItem.count += amount;
		if (cartItem.count === 0)
			this.cartItems.splice(cartIndex, 1);

		this.onProductUpdate(cartItem);
  }

  isEmpty() {
		return this.cartItems.length > 0 ? false : true;
  }

  getTotalCount() {
		return ( this.cartItems.reduce(function(totalCount, cartItem) { 
			return totalCount + cartItem.count 
		}, 0 ));
  }

  getTotalPrice() {
		return ( this.cartItems.reduce(function(totalSum, cartItem) { 
			return totalSum + cartItem.count * cartItem.product.price 
		}, 0));
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  //
  // Task 8|4 ↓ Basket, part 2.
  // 

  renderModal() {
    // Import
    this.modal = new Modal();
    // Create: Modal
    let dvModal = document.createElement('div');

    for (const cartItem of this.cartItems)
      dvModal.append(this.renderProduct(cartItem.product, cartItem.count));

    dvModal.append(this.renderOrderForm());

    // Import methods
    this.modal.setTitle('Your order');
    this.modal.setBody(dvModal);
    this.modal.open();

    // Create: click event | - or +
		let buttons = document.body.querySelectorAll('div.cart-counter > button.cart-counter__button');
    for (let button of buttons) {
      button.addEventListener('click', (event) => {
        // for +
        if (button.classList.contains('cart-counter__button_plus')) {
          let productId = event.target.closest('div.cart-product').getAttribute('data-product-id');
          this.updateProductCount(productId, 1);
        }
        // for -
        else if (button.classList.contains('cart-counter__button_minus')) {
          let productId = event.target.closest('div.cart-product').getAttribute('data-product-id');
          this.updateProductCount(productId, -1);
        }
			})
		}

    // Listener: onSubmit | httpbin
		let orderForm = document.body.querySelector('.cart-form');
		orderForm.addEventListener('submit', (event) => { this.onSubmit(event); });
  }

  onProductUpdate(cartItem) {
		this.cartIcon.update(this);
    // Modal is true
		if (document.body.classList.contains('is-modal-open')) {
      // Add data in modal
      if (this.getTotalCount() > 0) {
        let productId = cartItem.product.id;
        let modalBody = document.body.querySelector('.modal');
        
        let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
        
        productCount.innerHTML = cartItem.count;	
        productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

        // Delete product on counter 0
        if (cartItem.count < 1) {
          modalBody.querySelector(`div[data-product-id="${productId}"][class="cart-product"]`).remove();
        }
      } 
      // Close modal when menu is empty
      else if (this.getTotalCount() < 1) {
        document.body.classList.remove('is-modal-open');
        document.querySelector('.modal').remove();
      }
    }
  }

  async onSubmit(event) {
		event.preventDefault();

    // Add loading css class
		let submitButton = document.querySelector('button[type="submit"]');
		submitButton.classList.add('is-loading');

    // Get: Response status
		let response = await fetch('https://httpbin.org/post', {
			method: 'POST',
			body: new FormData(event.target)
		});

    // Create: Success notification
		if (response.ok) {
      this.modal.setTitle('Success!');

      let notification = document.createElement('div');
      notification.classList.add('modal__body-inner');
      notification.innerHTML = `
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      `;
      this.modal.setBody(notification);

      // Delete all product
			this.cartItems.splice(0, this.cartItems.length);
			this.cartIcon.update(this);
		}
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}