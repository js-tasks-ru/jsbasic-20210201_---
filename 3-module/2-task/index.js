function filterRange(arr, a, b) {
	return arr.filter(function(item){
		//console.log(item);
		return (item >= a && item <= b)
	})
}
