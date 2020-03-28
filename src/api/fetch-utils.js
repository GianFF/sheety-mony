import {SHEETY_INITIAL_PATH} from './constants'

const fetchData = (method, data) => {
  const headers = {
    method: method,
    headers:{
      'Content-Type': 'application/json'
    }
  }
  return data ? {...headers, body: JSON.stringify(data)} : headers
}

const doFetch = async (method, path, data) => {
  try {
    const response = await fetch(`${SHEETY_INITIAL_PATH}${path}`, fetchData(method, data))
    const body = await response.json()
    return {
      ...body,
      status: response.status
    }
  } catch (e) {
    // eslint-disable-next-line
    console.log(`ERROR en get.\nPath: ${path}.\nStacktrace: ${e}.`)
  }
}

export const put = async (path, data) => {
  return await doFetch('PUT', path, data)
}

export const post = async (path, data) => {
  return await doFetch('POST', path, data)
}

export const get = async (path) => {
  return await doFetch('GET', path)
}

export const handleError = async (accion, mensaje) => {
  try {
    return await accion()
  } catch (error) {
    // eslint-disable-next-line   
    console.log(`${mensaje} \nStackTrace: ${error}.`)
  }
}
