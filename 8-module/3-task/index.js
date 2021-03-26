export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    
    this.cartIcon.update(this);
  }
}

