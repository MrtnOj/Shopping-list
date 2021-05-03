import axios from 'axios'
import { config } from '../constants'

const instance = axios.create({
    baseURL: config.url.API_URL
})

export default instance