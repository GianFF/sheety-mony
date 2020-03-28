import {handleError, post, get} from './fetch-utils'

const mony_api = {
  seed: async () => {
    return handleError(
      async () => {
        post('/ceco', {ceco: {titulo: 'Auto'}})
        post('/ceco', {ceco: {titulo: 'Nafta'}})
        post('/ceco', {ceco: {titulo: 'Seguro'}})
        post('/ceco', {ceco: {titulo: 'Cochera'}})
        post('/ceco', {ceco: {titulo: 'Patente'}})
        post('/ceco', {ceco: {titulo: 'Casa'}})
      },
      `Error al guardar ceco.`
    )
  },
  cecos: async () => {
    return await handleError(
      async () => {
        return get('/cecos')
      },
      `Error al obtener cecos.`
    )
  },
  postGasto: async (gasto, cecoId) => {
    return handleError(
      () => post('/gasto', {gasto: {costo: gasto}, cecoId}),
      `Error al postear gasto con cecoId: ${cecoId} y gasto: ${gasto}.`
    )
  },
}

export default mony_api
