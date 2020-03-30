import { handleStatus } from '../utils/promise-helpers.js'
import { partialize, pipe } from '../utils/operators.js'

const getItemsFromNotas = notas => notas.flatMap(nota => nota.itens)
const filterItemsByCode = (code, items) => items.filter(item => item.codigo === code)
const sumItemsValue = items => items.reduce((total, item) => total + item.valor, 0)

const API = `http://localhost:3000/notas`;

export const notasService = {
  listAll() {
    return fetch(API)
      // lida com o status da requisição
      .then(handleStatus)
      .catch(err => Promise.reject('Não foi possível obter as notas fiscais'))
  },

  sumItemsByCode(code) {
    const filterItems = partialize(filterItemsByCode, code)
    const sumItems = pipe(
      getItemsFromNotas,
      filterItems,
      sumItemsValue
    )

    return this.listAll()
      .then(sumItems)
  }
}
