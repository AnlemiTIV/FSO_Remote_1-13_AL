import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getUrl = () => {
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getUrl, create, remove }