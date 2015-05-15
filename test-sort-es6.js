import      Fs   from 'fs';
import      Path from 'path';
import * as Sort from './sort-es6';

// test(sortf)(array)(cmpf);

function test(sortf) {
    return function (array) {
        return function (cmpf) {
            var start, end, result;
            start = new Date().getTime(); 
            result = sortf(array, cmpf);
            end = new Date().getTime();   
            console.log('\nFunction: %s(array, f)\nTime: %dms\nArray length: %d\nResult length: %d\nResult:\n%j.\n', 
                        sortf.name,
                        end - start,
                        array.length,
                        result.length,
                        result);
        };
    };  
}

let array = Fs.readFileSync(Path.join(__dirname, 'data.txt'), 'utf8')
              .split(/\s+/)
              .map(c => Number(c))
              .filter(c => !isNaN(c));

test(Sort.recurMergeSort)(array)((x, y) => x > y);
test(Sort.tailMergeSort )(array)((x, y) => x > y);
test(Sort.tailSelectSort)(array)((x, y) => x > y);