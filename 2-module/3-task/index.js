let calculator = {
  read : function(a, b) {
	this.property_a = a;
	this.property_b = b;
  },
  sum : function(val){
	return this.property_a + this.property_b
  },
  mul : function(val){
	return this.property_a * this.property_b
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
