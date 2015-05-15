function cmpNumber(array, start, end, f) {
    return f(array[start], array[end])
           ? [array[end], array[start]]
           : [array[start], array[end]];
}

function cmpArray(left, right, f) {
    return (function cmp(i, j, result, curr) {
        return typeof left[i] === 'number'
               ? typeof right[j] === 'number'
                 ? f(left[i], right[j])
                   ? (result.push(right[j]),
                      cmp(i, j + 1, result))
                   : (result.push(left[i]),
                      cmp(i + 1, j, result))
                 : (result.push(left[i]),
                    cmp(i + 1, j, result))
               : typeof right[j] === 'number'
                 ? (result.push(right[j]),
                    cmp(i, j + 1, result))
                 : result;
    }(0, 0, []));
}

function recurMergeSort(array, f) {
    var max = array.length - 1;
    return max < 1
           ? array 
           : (function sort(start, end) {   
                 var d = end - start, p; 
                 return d === 0
                        ? [array[start]]
                        : d === 1 
                          ? cmpNumber(array, start, end, f)
                          : (p = start + Math.floor(d / 2), 
                             cmpArray(sort(start, p), sort(p + 1, end), f));
             }(0, max));
}

function cmpLinear(array, f) {
// array: [a, b, c, ...]
    return (function cmp(i, result) {
        var j = i + 1;
        return typeof array[i] === 'number'
               ? typeof array[j] === 'number'
                 ? (result.push(cmpNumber(array, i, j, f)),
                    cmp(i + 2))
                 : (result.push([array[i]]),
                    result)
               : result;
    }(0, []));
}

function cmpMatrix(matrix, f) {
// array: [[a, ...], [b, ...], [c, ...], ...]
    return (function cmp(i, result) {
        var j = i + 1;
        return matrix[i] instanceof Array
               ? matrix[j] instanceof Array
                 ? (result.push(cmpArray(matrix[i], matrix[j], f)),
                    cmp(i + 2))
                 : (result.push(matrix[i]),
                    result)
               : result;
    }(0, []));
}

function tailMergeSort(array, f) {
    var max = array.length - 1;
    return max < 1
           ? array 
           : (function sort(matrix) {
                 return matrix.length === 1
                        ? matrix[0]
                        : sort(cmpMatrix(matrix, f));
             }(cmpLinear(array, f)));
}

function tailSelectSort(array, f) { 
    return (function sort(i, j) {
        return typeof array[i] === 'undefined'
               ? array
               : typeof array[j] === 'undefined'
                 ? sort(i + 1, i + 2)
                 : f(array[i], array[j])
                   ? ([array[i], array[j]] = [array[j], array[i]],
                      sort(i, j + 1))
                   : sort(i, j + 1)
    }(0, 1));
}

export {recurMergeSort, tailMergeSort, tailSelectSort}

