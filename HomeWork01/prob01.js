Array.prototype.removeNum = function (num) {
    let arr = this;
    return new Promise(function (resolve, reject) {
        resolve(arr.filter(n => n != num));
    });
    //return Promise.resolve(arr.filter(n => n != num));
}

console.log('Start');
//console.log([1, 3, 4, 2, 1, 5].removeNum(1));
[1,3,4,2,1,5].removeNum(1).then(console.log)
console.log('Finish');

// How does this affect the event loop: 
/*
    promises are pushed to PromiseQueue. Once stack is clear, 
    event loop will fetch promises from PromiseQueue and add to stack for processing/execution
*/
