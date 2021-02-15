function getMinMax(str) {
	let arr = str.split(/(\,\s)|(\s)|(\,)/g).filter(function(item){
		return item != String(' ') && !isNaN(item);
	}).sort((a,b) => a-b);
	return {min: Number(arr[0]), max: Number(arr[arr.length-1]),};
}

/// OR

/*
function getMinMax(str) {
	let arr = str.match(/(\-\d(\.\d+)|\-\d+(\.\d+)|\-\d+)|(\d+(\.\d+)|\d+)/g).sort((a,b) => a-b);
	return {min: Number(arr[0]), max: Number(arr[arr.length-1]),};
}
*/