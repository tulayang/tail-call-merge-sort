'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
function cmpNumber(array, start, end, f) {
	return f(array[start], array[end]) ? [array[end], array[start]] : [array[start], array[end]];
}

function cmpArray(left, right, f) {
	return (function cmp(_x, _x2, _x3, _x4) {
		var _again = true;

		_function: while (_again) {
			_again = false;
			var i = _x,
			    j = _x2,
			    result = _x3,
			    curr = _x4;
			if (typeof left[i] === 'number') {
				if (typeof right[j] === 'number') {
					if (f(left[i], right[j])) {
						result.push(right[j]);
						_x = i;
						_x2 = j + 1;
						_x3 = result;
						_again = true;
						continue _function;
					} else {
						result.push(left[i]);
						_x = i + 1;
						_x2 = j;
						_x3 = result;
						_again = true;
						continue _function;
					}
				} else {
					result.push(left[i]);
					_x = i + 1;
					_x2 = j;
					_x3 = result;
					_again = true;
					continue _function;
				}
			} else {
				if (typeof right[j] === 'number') {
					result.push(right[j]);
					_x = i;
					_x2 = j + 1;
					_x3 = result;
					_again = true;
					continue _function;
				} else {
					return result;
				}
			}
		}
	})(0, 0, []);
}

function recurMergeSort(array, f) {
	var max = array.length - 1;
	return max < 1 ? array : (function sort(start, end) {
		var d = end - start,
		    p;
		return d === 0 ? [array[start]] : d === 1 ? cmpNumber(array, start, end, f) : (p = start + Math.floor(d / 2), cmpArray(sort(start, p), sort(p + 1, end), f));
	})(0, max);
}

function cmpLinear(array, f) {
	// array: [a, b, c, ...]
	return (function cmp(_x5, _x6) {
		var _again2 = true;

		_function2: while (_again2) {
			j = undefined;
			_again2 = false;
			var i = _x5,
			    result = _x6;

			var j = i + 1;
			if (typeof array[i] === 'number') {
				if (typeof array[j] === 'number') {
					result.push(cmpNumber(array, i, j, f));
					_x5 = i + 2;
					_again2 = true;
					continue _function2;
				} else {
					return (result.push([array[i]]), result);
				}
			} else {
				return result;
			}
		}
	})(0, []);
}

function cmpMatrix(matrix, f) {
	// array: [[a, ...], [b, ...], [c, ...], ...]
	return (function cmp(_x7, _x8) {
		var _again3 = true;

		_function3: while (_again3) {
			j = undefined;
			_again3 = false;
			var i = _x7,
			    result = _x8;

			var j = i + 1;
			if (matrix[i] instanceof Array) {
				if (matrix[j] instanceof Array) {
					result.push(cmpArray(matrix[i], matrix[j], f));
					_x7 = i + 2;
					_again3 = true;
					continue _function3;
				} else {
					return (result.push(matrix[i]), result);
				}
			} else {
				return result;
			}
		}
	})(0, []);
}

function tailMergeSort(array, f) {
	var max = array.length - 1;
	return max < 1 ? array : (function sort(_x9) {
		var _again4 = true;

		_function4: while (_again4) {
			_again4 = false;
			var matrix = _x9;
			if (matrix.length === 1) {
				return matrix[0];
			} else {
				_x9 = cmpMatrix(matrix, f);
				_again4 = true;
				continue _function4;
			}
		}
	})(cmpLinear(array, f));
}

function tailSelectSort(array, f) {
	return (function sort(_x10, _x11) {
		var _again5 = true;

		_function5: while (_again5) {
			_temp = undefined;

			var _temp;

			_again5 = false;
			var i = _x10,
			    j = _x11;
			if (typeof array[i] === 'undefined') {
				return array;
			} else {
				if (typeof array[j] === 'undefined') {
					_x10 = i + 1;
					_x11 = i + 2;
					_again5 = true;
					continue _function5;
				} else {
					if (f(array[i], array[j])) {
						_temp = [array[j], array[i]], array[i] = _temp[0], array[j] = _temp[1], _temp;
						_x10 = i;
						_x11 = j + 1;
						_again5 = true;
						continue _function5;
					} else {
						_x10 = i;
						_x11 = j + 1;
						_again5 = true;
						continue _function5;
					}
				}
			}
		}
	})(0, 1);
}

exports.recurMergeSort = recurMergeSort;
exports.tailMergeSort = tailMergeSort;
exports.tailSelectSort = tailSelectSort;
