
const { Observable, of } = require('rxjs')
const { shareReplay } = require('rxjs/operators')
const axios = require('axios')

async function makeRequest(url) {
    try {
        console.log(`Making a request to ${url}`)
        const response = await axios.get(url)
        return response;
    } catch (error) {
        return { error }
    }
}

const obs$ = Observable.create(async (observer) => {
    const url = 'https://randomuser.me/api';
    console.log(`Making a request to ${url}`)
    const results = await axios.get(url);//makeRequest('https://randomuser.me/api')
    if (results.error) observer.error(results.error)
    else observer.next(results)
    observer.complete()
}).pipe(shareReplay(1))

const obs2$ = Observable.create(async (observer) => {
    console.log("executing");
    of(1, 2, 3).subscribe(i => observer.next(i));
})//.pipe(shareReplay(1))

// obs2$.subscribe(console.log);
// obs2$.subscribe(console.log);
// obs2$.subscribe(console.log);

const log = d => console.log('data');
obs$.subscribe(null)
obs$.subscribe(null)