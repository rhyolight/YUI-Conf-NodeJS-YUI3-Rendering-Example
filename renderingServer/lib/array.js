var l = require('./logger');

exports.contains = function(arr, it) {
	var i = arr.length;
	while(i--) {
		if (arr[i] === it) {
			return true;
		}
	}
	return false;
};

exports.findIndex = function(arr, finderFn) {
	var i = 0;
	for (; i<arr.length; i++) {
		if (finderFn(arr[i])) {
			return i;
		}
	}
}

exports.remove = function(arr, from, to) {
	var rest = arr.slice((to || from) + 1 || arr.length);
	arr.length = from < 0 ? arr.length + from : from;
	return arr.push.apply(arr, rest);
}
