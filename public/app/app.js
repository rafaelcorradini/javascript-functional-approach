import { notasService as service } from './nota/service.js'; 
import { takeUntil, debounceTime, pipe, partialize } from './utils/operators.js'
import { timeoutPromise, retry } from './utils/promise-helpers.js'
import { EventEmitter } from './utils/event-emitter.js'

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
)

const action = operations(() => 
  retry(3, 3000, () => timeoutPromise(200, service.sumItemsByCode('2143')))
    .then(total => EventEmitter.emit('total', total))
    .catch(console.error)
)

document
  .querySelector('#myButton')
  .onclick = action
