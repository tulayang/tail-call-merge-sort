'use strict';

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Fs = require('fs');

var _Fs2 = _interopRequireDefault(_Fs);

var _Path = require('path');

var _Path2 = _interopRequireDefault(_Path);

var _import = require('./sort-es5');

var Sort = _interopRequireWildcard(_import);

// test(sortf)(array)(cmpf);

function test(sortf) {
    return function (array) {
        return function (cmpf) {
            var start, end, result;
            start = new Date().getTime();
            result = sortf(array, cmpf);
            end = new Date().getTime();
            console.log('\nFunction: %s(array, f)\nTime: %dms\nArray length: %d\nResult length: %d\nResult:\n%j.\n', sortf.name, end - start, array.length, result.length, result);
        };
    };
}

var array = _Fs2['default'].readFileSync(_Path2['default'].join(__dirname, 'data.txt'), 'utf8').split(/\s+/).map(function (c) {
    return Number(c);
}).filter(function (c) {
    return !isNaN(c);
});

test(Sort.recurMergeSort)(array)(function (x, y) {
    return x > y;
});
test(Sort.tailMergeSort)(array)(function (x, y) {
    return x > y;
});
test(Sort.tailSelectSort)(array)(function (x, y) {
    return x > y;
});
