const getMinOrMax = (arr, largest, callback) => {
    if (!arr || !arr.length) return null;
        var picked = arr[0];
        for (const item of arr) {
            picked = (item > picked && largest) || (item < picked && !largest) ? item : picked;
        }
        if (callback) callback(picked);
}
Array.prototype.pluckNextTick = function (largest, callback) {
    let arr = this;
    return process.nextTick(() => getMinOrMax(arr, largest, callback));
}
Array.prototype.pluckSetImmediate = function (largest, callback) {
    let arr = this;
    return setImmediate(() => getMinOrMax(arr, largest, callback));
}

console.log('start');
[1, 2, 3, 4, 5, 6, 7, 8].pluckSetImmediate(true, console.log);
[1, 2, 3, 4, 5, 6, 7, 8].pluckNextTick(true, (num)=>console.log('nextTick: ' + num));
[1, 2, 3, 4, 5, 6, 7, 8].pluckSetImmediate(false, console.log);
[1, 2, 3, 4, 5, 6, 7, 8].pluckNextTick(false, (num)=>console.log('nextTick: ' + num));
console.log('end');
