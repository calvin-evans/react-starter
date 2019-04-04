import axios from 'axios'

const baseURLs = {
  development: 'http://localhost:3005/api'
}

const baseURL = baseURLs[process.env.NODE_ENV] || baseURLs.development

const client = axios.create({ baseURL })

export const updateToken = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default client
