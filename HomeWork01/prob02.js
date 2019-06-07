const { of, from, Observable } = rxjs;
const { flatMap } = rxjs.operators;

let url = 'https://randomuser.me/api/';

const extractInfo = (d) => {let { name, location } = d.results[0]; return { name, location };}
const callWithPromises = () => new Promise(function (resolve, reject) {
    fetch(url)
        .then(d => d.json())
        .then(extractInfo)
        .then(resolve);
});

const callWithAsyncAwait = async () => await fetch(url).then(d=>d.json()).then(extractInfo);

const callWithRxJs = () => of(url)
.pipe(flatMap((r)=>from(fetch(r, {mode: "cors"}))))
.subscribe(res=>console.log(res));
// .pipe(flatMap((r)=>from(fetch(r).then(d => d.json()))))
// .subscribe(res=>console.log(`Results From RxJs: ${JSON.stringify(extractInfo(res))}`));

let app = {
    usePromises: function () {
        callWithPromises().then(JSON.stringify).then(d=>console.log(`Results From Promise: ${d}`));
    },
    useAsyncAwait: async function () {
        let result = await callWithAsyncAwait();
        console.log(`Results From Async/Await: ${JSON.stringify(result)}`)
    },
    useRx: function () {
        callWithRxJs();
    }
}


window.app = app;

/*
    I think all of them are async operations as they don't block execution
*/