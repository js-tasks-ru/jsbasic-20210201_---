import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
		if (this.elem.offsetHeight == 0 && this.elem.offsetWidth == 0)
			return;

    // window.pageYOffset - текущая прокрутка px + documentElement.clientWidth - ширина окна клиента (без прокрутки)
		if (window.pageYOffset > 0 && document.documentElement.clientWidth >= 767) {

      // rect - DOMRect объект с 8-ми свойствами: left, top, right, bottom, x, y, width, height
			let getRect = document.querySelector('.container').getBoundingClientRect();
      let leftIndent = Math.min(
        getRect.right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px';

			this.elem.style = `position: fixed; z-index: 99; top: 50px; left: ${leftIndent};` 
		}

    else 
      this.elem.style = 'position: absolute';
  }
};