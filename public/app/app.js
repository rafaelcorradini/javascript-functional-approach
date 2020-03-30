import { notasService as service } from './nota/service.js'; 
import { takeUntil, debounceTime, pipe, partialize } from './utils/operators.js'
import { timeoutPromise, delay, retry } from './utils/promise-helpers.js'

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
)

const action = operations(() => 
  retry(3, 3000, () => timeoutPromise(200, service.sumItemsByCode('2143')))
    .then(delay(5000))
    .then(console.log)
    .catch(console.log)
)

document
  .querySelector('#myButton')
  .onclick = action
