import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    // console.log(this.products);

		let productsGrid = document.createElement('div');
		this.elem = productsGrid;
		productsGrid.classList.add('products-grid');
		productsGrid.innerHTML = `<div class="products-grid__inner"></div>`;
		this.productGridInner = this.elem.querySelector('.products-grid__inner');

    for (let product of this.products) {
      // ProductCard import 6/2
			let productCard = new ProductCard(product);
			this.productGridInner.append(productCard.elem);
    }
  }

  updateFilter(filters) {
    // Объеденение свойств объекта (клонирование)
    let allProperties = Object.assign(this.filters, filters);
    // 
    let applyFilter = this.products.filter(function (product) {
      if (allProperties.noNuts && allProperties.noNuts === product.nuts) 
        return false;
      if (allProperties.vegeterianOnly && allProperties.vegeterianOnly !== product.vegeterian)
        return false;
      if (allProperties.maxSpiciness && allProperties.maxSpiciness < product.spiciness)
        return false;
      if (allProperties.category && allProperties.category !== product.category)
        return false;
      
      return true;
    });
    // Сard update (on filters)
    this.productGridInner.innerHTML = '';
    for (let product of applyFilter) {
			let productCard = new ProductCard(product);
			this.productGridInner.append(productCard.elem);
    }
  }
}
