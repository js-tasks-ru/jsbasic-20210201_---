import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
  }

	async render() {
		let carousel = new Carousel(slides);
		document.querySelector('[data-carousel-holder]').appendChild(carousel.elem);

		let ribbonMenu = new RibbonMenu(categories);
		document.querySelector('[data-ribbon-holder]').appendChild(ribbonMenu.elem);

    let stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);

		let cartIcon = new CartIcon();
		document.querySelector('[data-cart-icon-holder]').appendChild(cartIcon.elem);

		let cart = new Cart(cartIcon);
	
		let response = await fetch('products.json');
		let products = await response.json();
		
		let productsGrid = new ProductsGrid(products);
		productsGrid.updateFilter({
			noNuts: document.getElementById('nuts-checkbox').checked,
			vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
			maxSpiciness: stepSlider.value,
			category: ribbonMenu.value
		});

		document.querySelector('[data-products-grid-holder]').innerHTML = '';
		document.querySelector('[data-products-grid-holder]').appendChild(productsGrid.elem);

		document.body.addEventListener('product-add', (event) => {
			let product = event.detail;
			cart.addProduct(product);
		});

		stepSlider.elem.addEventListener('slider-change', (event) => {
			productsGrid.updateFilter({
				maxSpiciness: event.detail
			});
		});

		ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
			productsGrid.updateFilter({
				category: event.detail
			});
		});

		let nutsControl = document.querySelector('#nuts-checkbox');
		nutsControl.addEventListener('change', (event) => {
			productsGrid.updateFilter({ noNuts: event.target.checked });
		});

		let vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');
		vegeterianCheckbox.addEventListener('change', (event) => {
			productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
		});
	}
}