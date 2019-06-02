
const { Observable } = require('rxjs')
const { shareReplay } = require('rxjs/operators')
const axios = require('axios')

async function makeRequest(url) {
    try {
        console.log(`Making a request to ${url}`)
        const response = await axios.get(url)
        return response
    } catch (error) {
        return { error }
    }
}

const obs$ = Observable.create(async (observer) => {
    const results = await makeRequest('https://randomuser.me/api')
    if (results.error) observer.error(results.error)
    else observer.next(results)
    observer.complete()
}).pipe(shareReplay(1))

const log = d => console.log('data');
obs$.subscribe(null)
obs$.subscribe(null)