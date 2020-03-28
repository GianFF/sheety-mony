import {handleError, post, get, put} from './fetch-utils'
import {SHEETS} from './constants'

const sanitizeColumns = (columns) => {
  columns.splice(columns.indexOf('id'), 1)
  columns.splice(columns.indexOf('fecha'), 1)
  columns.splice(columns.indexOf('total'), 1)
  return columns
}

const buildCeco = (cecoName, cecoFather, id) => {
  return {
    ceco: cecoName,
    superCeco: cecoFather,
    id
  }
}
const buildCecos = (sheetColumns, sheet) => {
  const columns = sanitizeColumns(Object.keys(sheetColumns))
  return columns.map((column) => buildCeco(column, sheet, sheetColumns.id))
}

const fromSheetyAnswearToCeCos = (response) => {
  const sheets = response.map(sheet => Object.keys(sheet)).flat()
  const sheetsColumns = response.map(sheet => Object.values(sheet)).flat()
  let result = []
  for (let i = 0; i < sheets.length; i++) {
    result = result.concat(buildCecos(sheetsColumns[i], sheets[i])).flat()
  }
  return result
}

const SHEETY_API = {
  cecos: async () => {
    return await handleError(
      async () => {
        const today = new Date(Date.now())
        const todayMonth = today.getMonth()
        const januaryIdInMySheet = 2
        const monthlyRow = todayMonth + januaryIdInMySheet
        const cecosPromises = SHEETS.map((sheet) => get(`/${sheet}/${monthlyRow}`))
        const response = await Promise.all(cecosPromises)
        return fromSheetyAnswearToCeCos(response)
      },
      `Error al obtener cecos.`
    )
  },
  postGasto: async (gasto, ceco) => {
    const subData = {}
    subData[`${ceco.ceco}`] = gasto
    const data = {}
    data[`${ceco.superCeco}`] = subData
    return handleError(
      () => post(`/${ceco.superCeco}`, data),
      `Error al postear gasto con cecoId: ${ceco} y gasto: ${gasto}.`
    )
  },
  putGasto: async (gasto, ceco) => {
    const subData = {}
    subData[`${ceco.ceco}`] = gasto
    const data = {}
    data[`${ceco.superCeco}`] = subData
    return handleError(
      () => put(`/${ceco.superCeco}/${ceco.id}/`, data),
      `Error al updatear gasto con cecoId: ${ceco.id} y gasto: ${gasto}.`
    )
  },
}

export default SHEETY_API
